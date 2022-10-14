const express = require('express');
const router = express.Router();
const {
    getItems,
    deleteItems,
    postItem,
    deleteItem,
    getItem,
    updateItem
} = require('../controllers/itemController');
const reqLogger = require('../middlewares/reqLogger')
const {itemValidator} = require('../middlewares/utils/validators')

//root

router.route('/')
    .get(reqLogger, getItems)
    .post(reqLogger, itemValidator, postItem)
    .delete(reqLogger, deleteItems)


    

    router.route('/:itemId')
    .get(reqLogger, getItem)
    .put(reqLogger, updateItem)
    .delete(reqLogger, deleteItem)

    module.exports = router;