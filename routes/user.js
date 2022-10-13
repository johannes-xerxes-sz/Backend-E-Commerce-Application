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
    .get(getUser)
    .post(postUser)
    .delete(deleteUser)


    router.route('/:UserId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

    module.exports = router;