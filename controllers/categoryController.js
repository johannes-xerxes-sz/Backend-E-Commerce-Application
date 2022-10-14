//! for TWO OR MORE '/categoryId' endpoint

const getCategories = (req, res, next) => {
    
    //query parameter
    //check if array empty or not
    if (Object.keys(req.query).length) {
            const category = req.query.categoryName
            console.log (`Seaching for category: ${category}`);
    }


    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'show me all categories'})
}

const postCategory = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg:`Create new category: ${req.body.categoryName} and this is for the gender: ${req.body.gender}`})
}

const deleteCategories = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'delete all categories'})
}

//! for SINGLE '/categoryId' endpoint

const getCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `show me one category with id: ${req.params.categoryId}`})
}

const updateCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `update category with id: ${req.params.categoryId}`})
}

const deleteCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `delete category with id: ${req.params.categoryId}`})
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