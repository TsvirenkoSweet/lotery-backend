const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    publicId: {
        type: String,
        default: uuid.v4
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: ''
    },
    balance: {
        type: Number,
        default: 0
    },
    deleteDate: {
        type: Date,
        default: ''
    },
    userProduct: {
        ref: 'user_products',
        type: Schema.Types.ObjectId
    }
});

userSchema.set('timestamp', true);

module.exports = mongoose.model('users', userSchema);
