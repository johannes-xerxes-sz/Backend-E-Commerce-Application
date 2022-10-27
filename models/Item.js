const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ItemSchema = new Schema ({
itemName: {
    type: String,
        required: true,
        maxLength: [15, 'Item can not be more than 15 characters']
    },
    itemDescription: {
        type: String,
        required: true,
        maxLength: [15, 'Item can not be more than 15 characters']
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
        enum: [
            'Male',
            'Female'
        ]
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        validate: (price) => {
            return typeof price === 'number';
        }
    },
    isClearance: {
        type: Boolean,
        default: false,
        validate: (isClearance) => {
            return typeof isClearance === 'boolean'
        }
    },
    colors: {
        type: [String],
        required: true
    },
    sizes: {
        type: [String],
        required: true,
        enum: [
            'Small',
            'Medium',
            'Large',
            'X-Large'
        ]
    },
    ratings:
        [RatingSchema],
    image: {
        type: String
    }
}, {
    timestamps: true
});

ItemSchema.pre('save', function(next) {
    this.itemName = this.itemName.trim(); 
    this.itemDescription = this.itemDescription.trim(); 

    next(); 
})

ItemSchema.post('save', function() {
    this.gender = this.gender.toUpperCase();
})

module.exports = mongoose.model('Item', ItemSchema);