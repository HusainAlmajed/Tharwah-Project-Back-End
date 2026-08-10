const mongoose = require ('mongoose')
const Category = require('./category')

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['Income' , 'Expense'],
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Transaction = mongoose.model('Transaction' , transactionSchema)
module.exports = Transaction