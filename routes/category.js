const express = require('express');
const router = express.Router();
const {
    getCategories,
    deleteCategories,
    postCategory,
    deleteCategory,
    getCategory,
    updateCategory
} = require('../controllers/categoryController');

//root

router.route('/')
    .get(getCategories)
    .post(postCategory)
    .delete(deleteCategories)


    router.route('/:categoryId')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory)

    module.exports = router;
