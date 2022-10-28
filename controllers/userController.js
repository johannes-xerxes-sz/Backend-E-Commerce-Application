const User = require('../models/User')
const crypto = require('crypto');
//! for TWO OR MORE '/ControllerId' endpoint

const getUsers = async (req, res, next) => {
    const filter = {}; //filters to return only selected fields e.g. usernams, gender
    const options = {}; //sorting, pagination e.g. limit 20 data to comeback or sorting by asc of userName
    if(Object.keys(req.query).length) {
        const { 
            userName, //randon username
            gender, // male
            limit, //200
            sortByFirstName // 1 or -1
        } = req.query

        if (userName) filter.userName = true
        if (gender) filter.gender = true

        if (limit) options.limit = limit;
        if (sortByFirstName) options.sort = {
            firstName: sortByFirstName === 'asc' ? 1 : -1
        }
        
    }
    try {
        const users = await User.find({}, filter, options);

        res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(users)
    }
    catch (err) {
        throw new Error(`Error retrieving users: ${err.message}`);

    }


}

const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        sendTokenResponse(user, 201, res)
/*         res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(user) */
    }
    catch (err) {
        throw new Error(`Error retrieving users: ${err.message}`);

    }

}

const deleteUsers = async (req, res, next) => {
    try {
        await User.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: 'delete all User'})
    }
    catch (err) {
        throw new Error(`Error retrieving users: ${err.message}`);

    }
    
}

//! for SINGLE '/categoryId' endpoint

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.UserId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    }
    catch (err) {
        throw new Error(`Error retrieving User with User of: ${req.params.UserId} ${err.message}`);
    }
}

const updateUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.UserId, {
            $set: req.body
        }, { new: true}); 
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    }
    catch (err) {
        throw new Error(`Error updating User with id of: ${req.params.UserId} ${err.message}`);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.UserId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `delete User with id: ${req.params.UserId}`})
    }
    catch (err) {
        throw new Error(`Error deleting User with id of: ${req.params.UserId} ${err.message}`);

    }

}
// for '/login' endpoint
const login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) throw new Error('Please provide an email and password');
    
    // find a user by email and return with password
    const user = await User.findOne({ email }).select('+password');

    // check to see if a user is returned
    if (!user) throw new Error('Invalid credentials')

    // check if password matches - if password not match then it will be error
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error ('Invalid credentials');

    sendTokenResponse(user, 200, res);

}

const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) throw new Error('No user found');

    const resetToken = user.getResetPasswordToken();
    try {
        await user.save({ validateBeforeSave: false});

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Password has been reset with token: ${resetToken}`
        })
    }
    catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false});
        throw new Error('Failed to save reset password token');
    }
}

// for '/resetPassword' endpoint
const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() } //find a resetPasswordExpire greater than the current time if there is one
    })
    if (!user) throw new Error('Invalid token');

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save()
    sendTokenResponse(user, 200, res)
}

// For '/updatePassword' endpoint
const updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const passwordMatches = await user.matchPassword(req.body.password);
    if (!passwordMatches) throw new Error('Password is incorrect');

    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res)
}

// For '/logout' endpoint
const logout = async (req, res, next) => {
    res
    .status(200)
    .cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    .json({ success: true, msg: 'Successfully logged out!'})
}

const sendTokenResponse = (user, statusCode, res) => {
    //generate toekn to send back to the user!
    const token = user.getSignedJwtToken();
    const options = {
        // set expiration for cookie to be ~2 hours
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true // encryption on the security to hide/encrypt payload
    }

    if (process.env.NODE_ENV === 'production') options.secure = true;

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token})
}

module.exports = {
    getUser,
    deleteUser,
    createUser,
    updateUser,
    getUsers,
    deleteUsers,
    login,
    forgotPassword,
    resetPassword,
    logout,
    updatePassword

}