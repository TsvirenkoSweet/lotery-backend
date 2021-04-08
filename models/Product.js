const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
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
        required: true,
        default: 0
    },
    daysToStart: {
        type: Date,
        default: Date.now
    },
    daysToEnd: {
        type: Date,
        default: Date.now
    },
    streamLink: {
        type: String,
        default: ''
    },
    productLink: {
        type: String,
        default: ''
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
