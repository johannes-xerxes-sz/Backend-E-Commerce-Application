//! for TWO OR MORE '/ControllerId' endpoint

const getUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'show me all User!'})
}

const postUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'create new User!'})
}

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'delete all User'})
}

//! for SINGLE '/categoryId' endpoint

const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `show me one User with id: ${req.params.UserId}`})
}

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `updare User with id: ${req.params.UserId}`})
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `delete User with id: ${req.params.UserId}`})
}
 
module.exports = {
    getUser,
    deleteUser,
    postUser,
    deleteUser,
    updateUser,
    getUsers,
    deleteUsers

}