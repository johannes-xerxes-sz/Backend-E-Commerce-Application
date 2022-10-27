const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

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

//bcrypt = prehook to hash our password before saving to the database!
UserSchema.pre('save', async function(next) {
    //first check if password is not modified
    if (!this.isModified('password')) // when you login the password is not change
    next();

    //when it make hash it complicated the data, shorter the number the lower complexity
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt) //reset your password, create new password, update current password
}) 

// generate our jwt token when user logs in or create new account!
UserSchema.methods.getSignedJwtToken = function() { //_id is ID in mongoDB
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// method to match password for login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema);