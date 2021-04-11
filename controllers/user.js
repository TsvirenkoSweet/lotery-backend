const bcrypt = require('bcryptjs');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const status = require('../utils/statusMessage');

module.exports.getById = async function (req, res) {
    const { id } = req.params;
    if (!id) { res.status(400).json({ message: 'id param is required' }) }

    try {
        const foundUser = await User.findById(id);
        foundUser ? status.ok(res, foundUser) : status.notFound(res, 'User not found');
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.getMyAccount = async function (req, res) {
    try {
        const user = await User.findById({_id: req.user.id});
        user ? status.ok(res, user) : status.notFound(res, 'User not found');
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const foundUser = await User.findOne({_id: req.user.id});

        if (foundUser && foundUser.role === 'admin') {
            const users = await User.find();
            status.ok(res, users)
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
            { new: true}
            );
        status.ok(res, user)
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function (req, res) {
    const { _id } = req.params;
    if (!_id) { res.status(400).json({ message: 'id param is required' }) }

    try {
        const foundUser = await User.findOne({_id: req.user.id});

        if (foundUser && foundUser.role === 'admin') {
            if (req.user.id !== _id) {
                await User.remove({_id});
                status.ok(res, { message: 'user has been deleted'})
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

async function updateUserBody(body) {
    let { password } = body;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return {...body, password: hashedPassword}
    }
    return body;
}

