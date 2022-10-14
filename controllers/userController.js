//! for TWO OR MORE '/ControllerId' endpoint

const { query } = require("express")

const getUsers = (req, res, next) => {


    if(Object.keys(req,query).length) {
        const { userName, gender } = req.query

        const filter = [];

        if (userName) filter.push(userName)
        if (gender) filter.push(gender)

        for (let i = 0; i < filter.length; i++) {
            console.log(`Searching user(s) by: ${filter[i]}`)
        }
    }

        res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'show me all User!'})
}

const createUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, 
        msg: `create one with the following fields:
        User Name: ${req.body.userName}
        First Name: ${req.body.firstName}
        Last Name: ${req.body.lastName}
        Gender: ${req.body.gender}
        Email: ${req.body.email}
        Password: ${req.body.password}
        Phone Number: ${req.body.phoneNumber}`
    })
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
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    deleteUsers

}