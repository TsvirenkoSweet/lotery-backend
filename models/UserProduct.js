const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const userProductSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    balanceCount: {
        type: Number,
        required: true
    },
    product: {
        ref: 'products',
        type: String
    }
});

userProductSchema.set('timestamp', true);

module.exports = mongoose.model('user_products', userProductSchema);
