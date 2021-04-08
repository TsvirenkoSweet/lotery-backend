const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    publicId: {
        type: Number,
        required: true
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
        default: '',
        unique: true
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
        default: Date.now
    },
    userProduct: {
        ref: 'user_products',
        type: Schema.Types.ObjectId
    }
});

userSchema.set('timestamp', true);

module.exports = mongoose.model('users', userSchema);
