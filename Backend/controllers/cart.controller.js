import CartProductModel from "../models/cartProduct.model.js"
import UserModel from "../models/user.model.js"

// add to cart controller 
export const addToCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body
        const userId = req.userId

        if (!productId) {
            return res.status(400).json({
                message: "Provide product",
                success: false
            })
        }
        // const alreadyExist = await CartProductModel.findOne({ productId })
        // if (alreadyExist) {
        //     return res.status(400).json({
        //         message: "Already Added into cart",
        //         success: false
        //     })
        // }

        const addToCart = await CartProductModel.create({
            productId,
            quantity,
            userId
        })
        const updateCartUser = await UserModel.updateOne(
            { _id: userId },
            {
                $push: {
                    shopping_cart: addToCart._id
                }
            }
        )
        return res.status(201).json({
            message: "Product added to cart",
            success: true,
            data: addToCart
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// get cart products controller
export const getCartController = async (req, res) => {
    try {
        const userId = req.userId
        const cartProducts = await CartProductModel.find({ userId }).populate("productId")
        return res.status(200).json({
            message: "Cart Fetched Successfully",
            success: true,
            data: cartProducts
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// update cart controller 
export const updateCartController = async (req, res) => {
    try {
        const { cartProductId, quantity } = req.body
        const userId = req.userId

        if (!cartProductId || !quantity) {
            return res.status(400).json({
                message: "Provide product",
                success: false
            })
        }
        const updateCart = await CartProductModel.findByIdAndUpdate(cartProductId, {
            quantity,
        }, { new: true })
        return res.status(201).json({
            message: "Product added to cart",
            success: true,
            data: updateCart
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// delete cart controller 
export const deleteCartController = async (req, res) => {
    try {
        const { cartProductId } = req.body
        const userId = req.userId

        if (!cartProductId) {
            return res.status(400).json({
                message: "Provide product",
                success: false
            })
        }

        const deleteCart = await CartProductModel.deleteOne({
            _id: cartProductId
        })
        const deleteCartUser = await UserModel.updateOne(
            { _id: userId },
            {
                $pull: { shopping_cart: cartProductId }
            }
        );

        return res.status(201).json({
            message: "Product added to cart",
            success: true,
            data: deleteCart
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}