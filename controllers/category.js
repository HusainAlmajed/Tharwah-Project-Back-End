const Category = require("../models/category.js")
const Transaction = require("../models/transaction.js")

const create = async (req, res) => {
  try {
    req.body.owner = req.user._id

    const category = await Category.create(req.body)
    category._doc.owner = req.user

    res.status(201).json(category)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const show = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId)
    
    if (!category) {
      return res.status(404).json({err: "Category not found" })
    }

    if (category.owner.toString() !== req.user._id) {
      return res.status(403).json({message: "You are not authorized to view this category"})
    }

    res.status(200).json(category)
  } catch (err) {res.status(500).json({ err: err.message })}
}

const update = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId)

    if (!category) {
      return res.status(404).json({err: "Category not found" })
    }

    if (category.owner.toString() !== req.user._id) {
      return res.status(403).json({message: "You are not authorized to edit this category"})
    }

    category.name = req.body.name
    category.type = req.body.type
    category.description = req.body.description

    await category.save()

    res.status(200).json({message: "Category updated successfully"})
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const index = async (req, res) => {
  try {
    const categories = await Category.find({owner: req.user._id})

    res.status(200).json(categories)
  } catch (err) {res.status(500).json({ err: err.message })}
}

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId)

    if (!category) {
      return res.status(404).json({err: "Category not found"})
    }

    if (category.owner.toString() !== req.user._id) {
      return res.status(403).json({message: "You are not authorized to delete this category"})
    }

    const categoryInUse = await Transaction.findOne({category: req.params.categoryId})

    if (categoryInUse) {
      return res.status(409).json({ message: "This category is being used by a transaction" })
    }

    await Category.findByIdAndDelete(req.params.categoryId)

    res.status(200).json({message: "Category deleted successfully"})
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  create,
  show,
  update,
  index,
  deleteCategory
}