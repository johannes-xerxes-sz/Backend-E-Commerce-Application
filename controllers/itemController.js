//! for TWO OR MORE '/ControllerId' endpoint

const getItems = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'show me all Item'})
}

const postItem = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'create new Item!'})
}

const deleteItems = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'delete all Item'})
}

//! for SINGLE '/categoryId' endpoint

const getItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `show me one Item with id: ${req.params.ItemId}`})
}

const updateItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `update Item with id: ${req.params.ItemId}`})
}

const deleteItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `delete Item with id: ${req.params.ItemId}`})
}

module.exports = {
    getItem,
    deleteItem,
    postItem,
    deleteItem,
    updateItem,
    getItems,
    deleteItems

}