const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const status = require('../utils/statusMessage');


module.exports.login = async function (req, res) {
    const { email, password } = req.body;

    if (!email) { status.badRequest(res, 'email is required') }
    if (!password) { status.badRequest(res, 'password is required') }

    const foundUser = await User.findOne( {email});

    if (foundUser) {
        const passwordResult = await bcrypt.compare(password, foundUser.password)
        if (passwordResult) {
            const payload = {
                userId: foundUser._id,
                email: foundUser.email,
            }
            const token = jwt.sign(payload, keys.jwt, { expiresIn: 60 * 60 });

            status.ok(res, token)

        } else {
            res.status(401).json({
                message: 'Password incorrect'
            })
        }
    } else {
        status.notFound(res, 'User not found')
    }
}

module.exports.register = async function (req, res) {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    if (!email) { status.badRequest(res, 'email is required') }
    if (!password) { status.badRequest(res, 'password is required') }
    if (!firstName) { status.badRequest(res, 'firstName is required') }
    if (!lastName) { status.badRequest(res, 'lastName is required') }

    const foundUser = await User.findOne( {email});

    if (foundUser) {
        res.status(409).json({
            message: 'This user already exist'
        })
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber: phoneNumber ? phoneNumber : ''
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
}
