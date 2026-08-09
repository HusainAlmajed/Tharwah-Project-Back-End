const Transaction = require("../models/transaction.js")

const create = async (req, res) => {
  try {
    req.body.owner = req.user._id

    const transaction = await Transaction.create(req.body)
    transaction._doc.owner = req.user

    res.status(201).json(transaction)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const show = async (req, res) => {
  try {
    const transaction = await Transaction.findById(
      req.params.transactionId
    )

    if (!transaction) {
      return res.status(404).json({
        err: "Transaction not found"
      })
    }

    if (transaction.owner.toString() !== req.user._id) {
      return res.status(403).json({
        message: "You are not authorized to view this transaction"
      })
    }

    res.status(200).json(transaction)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const update = async (req, res) => {
  try {
    const transaction = await Transaction.findById(
      req.params.transactionId
    )

    if (!transaction) {
      return res.status(404).json({
        err: "Transaction not found"
      })
    }

    if (transaction.owner.toString() !== req.user._id) {
      return res.status(403).json({
        message: "You are not authorized to edit this transaction"
      })
    }

    transaction.name = req.body.name
    transaction.transactionType = req.body.transactionType
    transaction.amount = req.body.amount
    transaction.date = req.body.date
    transaction.description = req.body.description
    transaction.Category = req.body.Category
    await transaction.save()

    res.status(200).json({
      message: "Transaction updated successfully"
    })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}


module.exports = {
  create,
  show,
  update,
}