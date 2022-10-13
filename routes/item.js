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
    .get(getItems)
    .post(postItem)
    .delete(deleteItems)


    

    router.route('/:ItemId')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)

    module.exports = router;