const express = require('express');
const router = express.Router();
const {
    getUsers,
    deleteUsers,
    createUser,
    deleteUser,
    getUser,
    updateUser
} = require('../controllers/userController');
const reqLogger = require('../middlewares/reqLogger')
const {
    userValidator,
    adminValidator
} = require('../middlewares/utils/validators')

//root

router.route('/')
    .get(reqLogger, adminValidator, getUsers)
    .post(reqLogger, userValidator, createUser)
    .delete(reqLogger, deleteUsers)


    router.route('/:userId')
    .get(reqLogger, getUser)
    .put(reqLogger, updateUser)
    .delete(reqLogger, deleteUser)

    module.exports = router;