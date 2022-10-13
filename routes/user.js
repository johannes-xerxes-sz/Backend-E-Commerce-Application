const express = require('express');
const router = express.Router();
const {
    getUsers,
    deleteUsers,
    postUser,
    deleteUser,
    getUser,
    updateUser
} = require('../controllers/userController');

//root

router.route('/')
    .get(getUsers)
    .post(postUser)
    .delete(deleteUsers)


    router.route('/:UserId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

    module.exports = router;