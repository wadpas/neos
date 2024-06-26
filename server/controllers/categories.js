const Category = require('../models/category')

const getCategories = async (req, res) => {
	const categories = await Category.find({})
	res.status(200).json({ categories })
}

const createCategory = async (req, res) => {
	const category = await Category.create(req.body)
	res.status(201).json({ category })
}

const getCategory = async (req, res) => {
	const { id } = req.params
	const category = await Category.findById({ _id: id })
	if (!category) {
		return res.status(404).json(`Category ${id} not found`)
	}
	res.status(200).json({ category })
}

const updateCategory = async (req, res) => {
	const { id } = req.params
	const category = await Category.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidation: true })
	if (!category) {
		return res.status(404).json(`Category ${categoryId} not found`)
	}
	res.status(200).json({ category })
}

const deleteCategory = async (req, res, next) => {
	const { id } = req.params
	const category = await Category.findOneAndDelete({ _id: id })
	if (!category) {
		return next(customError(`No category with id : ${id}`, 404))
	}
	res.status(200).json({ category })
}

module.exports = {
	getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
}
