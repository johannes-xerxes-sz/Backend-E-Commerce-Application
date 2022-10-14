//! for TWO OR MORE '/ControllerId' endpoint

const getItems = (req, res, next) => {
    
    //query parameter
    if (Object.keys(req.query).length) {
        const {
            gender,
            price,
            isClearance,
            category,
            colors,
            sizes

        } = req.query

        const filter = [];
        if (gender) filter.push(gender);
        if (price) filter.push(price);
        if (isClearance) filter.push(isClearance);
        if (category) filter.push(category);
        if (colors) filter.push(colors);
        if (sizes) filter.push(sizes);

        for (let i = 0; i < filter.length; i++) {
            console.log(`Searching item by: ${filter[i]}`)
        }
    }
    
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: 'show me all Item'})
}

const postItem = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { 
            success: true,
            msg: `create one item with the following fields:
            Item Name: ${req.body.itemName}
            Item Description: ${req.body.itemDescription}
            Gender: ${req.body.gender}
            Price: ${req.body.price}
            isClearance: ${req.body.isClearance}
            category: ${req.body.category}
            colors: ${req.body.colors}
            sizes ${req.body.sizes}`
    })
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