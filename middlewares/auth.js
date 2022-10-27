const User = require('../models/User');
const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
    let token; // no '=' means undefined

    //check if req.headers,authorization has 'Bearer' token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    //check if no token
    if (!token) throw new Error('Not authorized to access this route!');
    try {

        //verify if token is real and matches the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //fetch for the user, and add a user object to object
        req.user = await User.findById(decoded.id)

        next();
    }
    catch (err) {
        throw new Error('Not authorized to access this route!');
    }
}

module.exports = protectedRoute;