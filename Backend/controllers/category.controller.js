import CategoryModel from "../models/category.model.js"
import ProductModel from "../models/product.model.js"
import SubCategoryModel from "../models/subCategory.model.js"

// Add category
export const addCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body

        if (!name || !image) {
            return res.status(400).json({
                message: "Provide name and image",
                success: false
            })
        }

        const addCategory = await CategoryModel.create({
            name,
            image
        })
        if (!addCategory) {
            return res.status(400).json({
                message: "Category Not Added",
                success: false
            })
        }

        return res.status(201).json({
            message: "Category Added Successfully",
            success: true,
            data: addCategory
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }

}

// Get category
export const getCategoryController = async (req, res) => {
    try {
        const data = await CategoryModel.find()

        res.status(200).json({
            message: "Category Fetched Successfully",
            success: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// update category
export const updateCategoryController = async (req, res) => {
    try {
        const { id, name, image } = req.body
        if (!name || !image) {
            return res.status(400).json({
                message: "Provide name and image",
                success: false
            })
        }
        const update = await CategoryModel.findByIdAndUpdate(id, {
            name,
            image
        }, {
            new: true
        })
        if (!update) {
            return res.status(400).json({
                message: "Category not updated",
                success: false
            })
        }
        return res.status(200).json({
            message: "Category updated successfully",
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

// delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                message: "Category not found",
                success: false
            })
        }
        // check in subcategory 
        const checkSubCategory = await SubCategoryModel.findOne({
            category: {
                "$in": [id]
            }
        }).countDocuments()
        // check in product 
        const checkProduct = await ProductModel.findOne({
            category: {
                "$in": [id]
            }
        }).countDocuments()

        // if category is used in sub category and product then not delete
        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category is already used can't delete",
                success: false
            })
        }

        const deleteCategory = await CategoryModel.findByIdAndDelete(id)
        if (!deleteCategory) {
            return res.status(400).json({
                message: "Category not deleted",
                success: false
            })
        }
        return res.status(200).json({
            message: "Category deleted successfully",
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
