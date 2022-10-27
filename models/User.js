const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema ({
    userName: {
        type: String,
        unique: true,
        required: [true, 'Please add a user name!'],
        maxLength: [10, 'User name can not be more than 10 characters']
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
        enum: [
            'Male',
            'Female'
        ]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate: (email) => {
            return validator.isEmail(email);
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate: (password) => {
            return validator.isStrongPassword(password);
        }

    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    admin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})
/* 
ItemSchema.pre('save', () => {
    this.itemDescription = this.itemDescription.trim();
    this.itemName = this.itemName.trim();
    next(); 
})*/

module.exports = mongoose.model('User', UserSchema);