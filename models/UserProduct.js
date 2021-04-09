const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProductSchema = new Schema({
    balanceCount: {
        type: Number,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    product: {
        ref: 'products',
        type: Schema.Types.ObjectId
    }
});

userProductSchema.set('timestamp', true);

module.exports = mongoose.model('user_products', userProductSchema);
