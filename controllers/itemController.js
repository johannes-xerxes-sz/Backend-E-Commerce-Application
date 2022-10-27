const Item = require('../models/Item')
const path = require('path');

//! for TWO OR MORE '/ControllerId' endpoint

const getItems = async (req, res, next) => {
    const filter = {};
    const options = {}; 
     //query parameter
    if (Object.keys(req.query).length) {
        const {
            gender,
            price,
            isClearance,
            category,
            colors,
            sizes,

            sortByPrice,
            limit


        } = req.query

        const filter = [];
        if (gender) filter.gender = true;
        if (price) filter.price = true;
        if (isClearance) filter.isClearance = true;
        if (category) filter.category = true;
        if (colors) filter.colors = true;
        if (sizes) filter.sizes = true;

        if (limit) options.limit = limit;
        if (sortByPrice) options.sort = {
            price: sortByPrice === 'asc' ? 1 : -1
        }
    } 





    try {
        const result = await Item.find({}, filter, options);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
        }
        catch (err) {
            throw new Error(`Error retrieving items: ${err.message}`);

        }

}

const postItem = async (req, res, next) => {
    try {
        const result = await Item.create(req.body);
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error retrieving items: ${err.message}`);

    }

}

const deleteItems = async (req, res, next) => {
    try {
        await Item.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: 'delete all Item'})
    }
    catch (err) {
        throw new Error(`Error retrieving items: ${err.message}`);

    }
    

}

//! for SINGLE '/categoryId' endpoint

const getItem = async (req, res, next) => {

    try {
        const result = await Item.findById(req.params.itemId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error retrieving item with id of: ${req.params.itemId} ${err.message}`);
    }

}

const updateItem = async (req, res, next) => {

    try {
        const result = await Item.findByIdAndUpdate(req.params.ItemId, {
            $set: req.body
        }, { new: true}); 
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error updating item with id of: ${req.params.ItemId} ${err.message}`);
    }

}

const deleteItem = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.ItemId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( { success: true, msg: `delete Item with id: ${req.params.ItemId}`})
    }
    catch (err) {
        throw new Error(`Error deleting item with id of: ${req.params.ItemId} ${err.message}`);

    }

}

//! For '/itemId/ratings' endpoint

const getItemRatings = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        const ratings = item.ratings;

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ratings)

    }
    catch (err) {
        throw new Error (`Error retrieving all ratings: ${err.message}`)
    }
}

const postItemRating = async (req, res, next) => {
        try {
            const item = await Item.findById(req.params.itemId);
            item.ratings.push(req.body);


            const result = await item.save(); //save the new item with new rating
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
        }
        catch (err) {
            throw new Error(`Error posting an Item rating: ${err.message}`);
        }
}

const deleteItemRatings = async (req, res, next) => {
    try{
        const item = await Item.findById(req.params.itemId);
        item.ratings = [];
        await item.save();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `deleted all ratings`})
    }
    catch (err) {
        throw new Error(`Error deleting all ratings: ${err.message}`)
    }
}
//! For '/itemId/ratings' endpoint

//! For '/itemId/ratings/:ratingId' endpoint

const getItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId)
        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        if (!rating) {rating = {success: false, msg: `No rating found with rating id: ${req.params.ratingId}`}}
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)
    }
    catch (err) {
        throw new Error(`Error retrieving rating with ID: ${req.params.ratingId}, ${err.message}`)
    }
}

const updateItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating)
            item.ratings.splice(ratingIndexPosition, 1, req.body);
            rating = item.ratings[ratingIndexPosition]
            await item.save();
        }
        else {
            rating = {success: false, msg: `No rating found with rating ID: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating);
    }
    catch (err) {
        throw new Error(`Error updating rating with id" ${req.params.ratingId}`)
    }
}

const deleteItemRating = async (req, res, next) => {
    try {
        let item = await Item.findById(req.params.itemId);

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1);
            rating = {success: true, msg: `Rating with ID: ${req.params.ratingId} deleted`}
            await item.save();
        }
        else {
            rating = {success: false, msg: `No rating found with rating ID: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)
    }
    catch (err) {
        throw new Error (`Error deleting rating with ID: ${req.params.ratingId}: ${err.message}`)
    }
}

//! For '/itemId/ratings/:ratingId' endpoint
// 11/25

const postItemImage = async(req, res, next) => {
    if(!req.files) throw new Error('Missing image!')
    const file = req.files.file
    if (!file.mimetype.startsWith('image')) throw new Error('Please upload an image file type!')
    if (file.size > process.env.MAX_FILE_SIZE) throw new Error(`Image exceeds size of ${process.env.MAX_FILE_SIZE}`);
    file.name = `photo_${path.parse(file.name).ext}`
    const filePath = process.env.FILE_UPLOAD_PATH + file.name
    file.mv((filePath), async (err) => {
        if (err) throw new Error('Problem uploading photo');
        await Item.findByIdAndUpdate(req.params.itemId, { image: file.name})
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, data: file.name})
    })
}

module.exports = {
    getItem,
    deleteItem,
    postItem,
    deleteItem,
    updateItem,
    getItems,
    deleteItems, //!end
    getItemRatings,
    postItemRating,
    deleteItemRatings,
    getItemRating,
    updateItemRating,
    deleteItemRating,
    postItemImage

}