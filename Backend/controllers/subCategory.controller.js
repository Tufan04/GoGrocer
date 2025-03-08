import ProductModel from "../models/product.model.js"
import SubCategoryModel from "../models/subCategory.model.js"


// Add sub category 
export const AddSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body

        if (!name || !image || !category) {
            return res.status(400).json({
                message: "Provide name and image and category",
                success: false
            })
        }
        const addSubCategory = await SubCategoryModel.create({
            name,
            image,
            category
        })

        // populate sub category to get category name
        await addSubCategory.populate("category")

        if (!addSubCategory) {
            return res.status(400).json({
                message: "Sub category not added",
                success: false
            })
        }
        return res.status(201).json({
            message: "Sub category added successfully",
            success: true,
            data: addSubCategory
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// fetch sub category
export const getSubCategoryController = async (req, res) => {
    try {
        const response = await SubCategoryModel.find().populate("category").sort({ createdAt: -1 })
        return res.status(200).json({
            message: "all sub category",
            success: true,
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// update sub category
export const updateSubCategoryController = async (req, res) => {
    try {
        const { id, name, image, category } = req.body
        if (!name || !image || !category) {
            return res.status(400).json({
                message: "Provide name and image",
                success: false
            })
        }
        const update = await SubCategoryModel.findByIdAndUpdate(id, {
            name,
            image,
            category
        }, {
            new: true
        }).populate("category")

        if (!update) {
            return res.status(400).json({
                message: "Sub category updated",
                success: false
            })
        }
        return res.status(200).json({
            message: "Sub category updated successfully",
            success: true,
            data: update
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// delete sub category
export const deleteSubCategoryController = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                message: "Sub category not found",
                success: false
            })
        }
        // check in product 
        const checkProduct = await ProductModel.findOne({
            category: {
                "$in": [id]
            }
        }).countDocuments()

        // if sub category is used in product then not delete
        if (checkProduct > 0) {
            return res.status(400).json({
                message: "Sub category is already used can't delete",
                success: false
            })
        }

        const deleteCategory = await SubCategoryModel.findByIdAndDelete(id)
        if (!deleteCategory) {
            return res.status(400).json({
                message: "Sub category not deleted",
                success: false
            })
        }
        return res.status(200).json({
            message: "Sub category deleted successfully",
            success: true,
            data: deleteCategory
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}