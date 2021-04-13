const Product = require('../models/Product');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const status = require('../utils/statusMessage');

module.exports.create = async function (req, res) {
    const { title, description, status, price, progress,
        daysToStart, daysToEnd, streamLink, productLink } = req.body;

    if (!title) { status.badRequest(res, 'title is required') }
    if (!price) { status.badRequest(res, 'price is required') }
    if (!daysToStart) { status.badRequest(res, 'daysToStart is required') }
    if (!daysToEnd) { status.badRequest(res, 'daysToEnd is required') }
    if (!productLink) { status.badRequest(res, 'productLink is required') }

    try {
        const currentUser = await User.findById({_id: req.user.id});
        if (currentUser && currentUser.role === 'admin') {
            const product = new Product({
                title,
                image: req.file ? req.file.path : '',
                description: description ? description : {
                    text: 'This is iPhone 12 Pro Max This is iPhone 12 Pro Max  ' +
                        'This is iPhone 12 Pro Max This is iPhone 12 Pro Max  ' +
                        'This is iPhone 12 Pro Max This is iPhone 12 Pro Max ',
                    platform: 'IOS'
                },
                status: status ? status : 'pending',
                price,
                progress: progress ? progress : 0,
                daysToStart,
                daysToEnd,
                streamLink: streamLink ? streamLink : '',
                productLink
            });
            try {
                await product.save();
                res.status(201).json(product);
            } catch (e) {
                errorHandler(res, e);
            }
        } else {
            status.badRequest(res, 'You dont have access to this request');
        }
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const products = await Product.find();
        if (products) {
            res.status(200).json({ products })
        }
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function (req, res) {
    const { id } = req.params;
    const { title, description, status, price, progress,
        daysToStart, daysToEnd, streamLink, productLink, deleteDate } = req.body;

    const updated = {
        title,
        description,
        status,
        price,
        progress,
        daysToStart,
        daysToEnd,
        streamLink,
        productLink,
        deleteDate
    };
    if (req.file) {
        updated.image = req.file.path;
    }
    try {
        const product = await Product.findOneAndUpdate(
            { _id: id },
            { $set: updated },
            { new: true, omitUndefined: true }
            )
        if (product) {
            res.status(200).json({ product })
        }
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function (req, res) {
    try {
        const products = await Product.find();
        if (products) {
            res.status(200).json({ products })
        }
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function (req, res) {
    const { id } = req.params;
    if (!id) { res.status(400).json({ message: 'id param is required' }) }

    try {
        const foundUser = await Product.findOne({_id: req.user.id});

        if (foundUser && foundUser.role === 'admin') {
            try {
                await Product.remove({_id: id});
                res.status(200).json({message: 'user has been deleted'});
            } catch (e) {
                errorHandler(res, e);
            }
        } else {
            status.badRequest(res, 'You dont have access to this request');
        }
    } catch (e) {
        errorHandler(res, e);
    }
}

