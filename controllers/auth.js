const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');


module.exports.login = async function (req, res) {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const foundUser = await User.findOne( {email});

    if (foundUser) {
        const passwordResult = await bcrypt.compare(password, foundUser.password)
        if (passwordResult) {
            const payload = {
                userId: foundUser._id,
                email: foundUser.email,
            }
            const token = jwt.sign(payload, keys.jwt, { expiresIn: 60 * 60 });

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            res.status(401).json({
                message: 'Password incorrect'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }

}
module.exports.register = async function (req, res) {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

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
            password: hashedPassword
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            console.log(e.message);
        }
    }
}
