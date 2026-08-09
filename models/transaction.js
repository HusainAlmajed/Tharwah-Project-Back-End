const mongoose = require ('mongoose')
const Category = require('./category')

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        requreid: true,
    },
    transactionType: {
        type: String,
        enum: ['Income' , 'Expenses'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Transaction = mongoose.model('Transaction' , transactionSchema)
module.exports = Transaction