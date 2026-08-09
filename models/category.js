const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.types.ObjectId,
        ref: 'User',
    }
})

const Category = mongoose.model('Category' , categorySchema)
module.exports = Category