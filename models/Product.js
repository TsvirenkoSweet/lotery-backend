const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        enum : ['pending', 'started', 'finished'],
        default: 'pending'
    },
    price: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    daysToStart: {
        type: Date,
        required: true
    },
    daysToEnd: {
        type: Date,
        required: true
    },
    streamLink: {
        type: String,
        default: ''
    },
    productLink: {
        type: String,
        required: true
    },
    deleteDate: {
        type: Date,
        default: ''
    },
    createdAt: Number,
    updatedAt: Number,
});

productSchema.set('timestamp', true);

module.exports = mongoose.model('products', productSchema);
