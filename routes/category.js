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
const reqLogger = require('../middlewares/reqLogger')
const {categoryValidator} = require('../middlewares/utils/validators')

//root

router.route('/')
    .get(reqLogger, getCategories)
    .post(reqLogger, categoryValidator, postCategory)
    .delete(reqLogger, deleteCategories)


    router.route('/:categoryId')
    .get(reqLogger, getCategory)
    .put(reqLogger, updateCategory)
    .delete(reqLogger, deleteCategory)

    module.exports = router;
