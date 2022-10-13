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

//root

router.route('/')
    .get(getItem)
    .post(postItem)
    .delete(deleteItem)


    router.route('/:ItemId')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)

    module.exports = router;