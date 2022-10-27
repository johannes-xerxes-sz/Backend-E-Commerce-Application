const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: [15, 'Category can not be more than 15 characters']
    },
    gender: {
        type: String,
        required: true,
        enum: [
            'Male',
            'Female'
        ]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Category', CategorySchema);