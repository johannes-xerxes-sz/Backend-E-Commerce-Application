const Category = require('../models/Category');

//! for TWO OR MORE '/categoryId' endpoint

const getCategories = async (req, res, next) => {
    
    // query parameter
    // check if array empty or not


    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {

            const {
                categoryName,
                gender,
                sortByCategory,
                limit
            } = req.query

            if (categoryName) filter.categoryName = true
            if (gender) filter.gender = true
            if (sortByCategory) filter.sortByCategory = true
            
    
            if (limit) options.limit = limit;
            if (sortByFirstName) options.sort = {
                firstName: sortByFirstName === 'asc' ? 1 : -1
            }

    }


    try {
        const categories = await Category.find();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(categories)

    } catch (err) {
        throw new Error(`Error retrieving categories: ${err.message}`);
    }


}

const postCategory = async (req, res, next) => {

    try {
        const category = await Category.create(req.body);

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(category);
    
    }
    catch (err) {
        throw new Error(`Error retrieving categories: ${err.message}`);
    }

   }

const deleteCategories = async (req, res, next) => {

    try {
        await Category.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: 'delete all categories'})
    }
    catch (err) {
        throw new Error(`Error retrieving categories: ${err.message}`);
    }

}

//! for SINGLE '/categoryId' endpoint

const getCategory = async (req, res, next) => {

    try {
        const category = await Category.findById(req.params.categoryId);
        
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(category)
    }
    catch (err) {
        throw new Error(`Error retrieving category with id of: ${req.params.categoryId} ${err.message}`);
    }
    
}

const updateCategory = async (req, res, next) => {

    try {
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
            $set: req.body
        }, { new: true}); 
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(category)
    }
    catch (err) {
        throw new Error(`Error updating category with id of: ${req.params.categoryId} ${err.message}`);
    }

}

const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.categoryId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `delete category with id: ${req.params.categoryId}`})

    }
    catch (err) {
        throw new Error(`Error deleting category with id of: ${req.params.categoryId} ${err.message}`);

    }

}

module.exports = {
    getCategories,
    deleteCategories,
    postCategory,
    deleteCategory,
    getCategory,
    updateCategory,
    deleteCategory

}