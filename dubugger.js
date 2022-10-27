const deleteItemRating = async(req, res, next) => {
    try {
        let item = await Item.findById(req.params.itemId);

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if(rating){
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1);
            rating = {success: true, msg: `Rating with id: ${req.params.ratingId} deleted`}
            await item.save();
        }
        else{
            rating = {success: false, msg: `No rating found with rating id: ${req.params.ratingId}`}
        }
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating)
    } catch (err) {
        throw new Error(`Error deleting rating with id of: ${req.params.ratingId}: ${err.message}`)
    }
};