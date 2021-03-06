const bcrypt = require('bcryptjs');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const status = require('../utils/statusMessage');

module.exports.getById = async function (req, res) {
    const { id } = req.params;
    if (!id) { res.status(400).json({ message: 'id param is required' }) }

    try {
        const currentUser = await User.findById({_id: req.user.id});
        const foundUser = await User.findById(id);
        if (foundUser && currentUser.role === 'admin') {
            foundUser ? res.status(200).json({ user: foundUser }) : status.notFound(res, 'User not found');
        } else {
            status.badRequest(res, 'You dont have access to this request');
        }
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.getMyAccount = async function (req, res) {
    try {
        await User.findById({_id: req.user.id})
            .populate({
                path: 'userProduct',
                populate: {
                    path: 'product'
                }
            }).exec((err, user) => {
                if (err) {
                    status.badRequest(res, err.message);
                }
                user ? res.status(200).json({ user }) : status.notFound(res, 'User not found');
            });
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.getAll = async function (req, res) {
    try {
        const foundUser = await User.findOne({_id: req.user.id});

        if (foundUser && foundUser.role === 'admin') {
            const users = await User.find();
            res.status(200).json({ users })
        } else {
            status.badRequest(res, 'You dont have access to this request');
        }
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.update = async function (req, res) {
    try {
        const body = await updateUserBody(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: body },
            { new: true, omitUndefined: true }
            );
        res.status(200).json({ user });
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.remove = async function (req, res) {
    const { id } = req.params;
    if (!id) { res.status(400).json({ message: 'id param is required' }) }

    try {
        const foundUser = await User.findOne({_id: req.user.id});

        if (foundUser && foundUser.role === 'admin') {
            if (req.user.id !== id) {
                try {
                    await User.remove({_id: id});
                    res.status(200).json({message: 'user has been deleted'});
                } catch (e) {
                    errorHandler(res, e);
                }
            } else {
                status.badRequest(res, 'You cant remove yourself');
            }
        } else {
            status.badRequest(res, 'You dont have access to this request');
        }
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.buyToken = async function (req, res) {
    //emulate response from some BANK API
    const bankResponse = {
        status: 'ok',
        tokenCount: 100
    }

    try {
        const foundUser = await User.findOne({_id: req.user.id});
        const { _id } = foundUser;
        const balance = foundUser.balance + bankResponse.tokenCount;
        await User.updateOne(
            { _id },
            { $set: { balance }},
            { new: true}
        );
        res.status(200).json({ balance });
    } catch (e) {
        errorHandler(res, e);
    }
}

async function updateUserBody(body) {
    let { password } = body;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return {...body, password: hashedPassword}
    }
    return body;
}

