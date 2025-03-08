import ProductModel from "../models/product.model.js"


// add product
export const addProductController = async (req, res) => {
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details, publish } = req.body

        //check details available or not
        if (!name || !image || !category || !subCategory || !unit || !stock || !price || !description || !publish) {
            return res.status(400).json({
                message: "Provide mandatory fields",
                success: false
            })
        }

        // add product into database
        const addProduct = await ProductModel.create({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
            publish
        })

        if (!addProduct) {
            return res.status(400).json({
                message: "Product not added",
                success: false
            })
        }
        return res.status(201).json({
            message: "Product added successfully",
            success: true,
            data: addProduct
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }

}

// get products
export const getProductController = async (req, res) => {
    try {
        const data = await ProductModel.find()
            .populate("category")
            .populate("subCategory")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Category Fetched Successfully",
            success: true,
            data,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// update products
export const updateProductController = async (req, res) => {
    try {
        const { id, name, image, category, subCategory, unit, stock, price, discount, description, more_details, publish } = req.body

        // check details available or not
        if (!id || !name || !image || !category || !subCategory || !unit || !price || !description || !publish) {
            return res.status(400).json({
                message: "Provide mandatory fields",
                success: false
            })
        }
        // update product into database
        const updateProduct = await ProductModel.findByIdAndUpdate(id, {
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
            publish
        }, {
            new: true
        })

        if (!updateProduct) {
            return res.status(400).json({
                message: "Product not added",
                success: false
            })
        }
        return res.status(201).json({
            message: "Product updated successfully",
            success: true,
            data: updateProduct
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// delete products
export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                message: "Provide mandatory fields",
                success: false
            })
        }
        // delete product from database
        const deleteProduct = await ProductModel.findByIdAndDelete(id)
        if (!deleteProduct) {
            return res.status(400).json({
                message: "Product not deleted",
                success: false
            })
        }
        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data: deleteProduct
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}