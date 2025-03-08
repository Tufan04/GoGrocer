import CartProductModel from "../models/cartProduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Cash on delivery handler
export async function addCODOrderController(req, res) {
    try {
        const { product_details, delivery_address, totalAmount } = req.body
        const userId = req.userId

        if (!product_details || !delivery_address || !totalAmount) {
            return res.status(400).json({
                message: "Provide product details",
                success: false
            })
        }
        const order = await OrderModel.create({
            userId,
            product_details,
            delivery_address,
            totalAmount,
            payment_mode: "Cash On Delivery",
            delivery_status: "Processing"
        })
        const populatedOrder = await OrderModel.findById(order._id)
            .populate("product_details")
            .populate("delivery_address")
            .sort({ createdAt: -1 });

        if (order) {
            await UserModel.findByIdAndUpdate(userId, {
                $push: { orderHistory: order._id },
                $set: { shopping_cart: [] }
            })
            await CartProductModel.deleteMany({ userId });
        }
        return res.status(200).json({
            message: "Order Placed Successfully",
            success: true,
            data: populatedOrder
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}
// get all orders for an particular user
export async function getOrdersController(req, res) {
    try {
        const userId = req.userId;
        // Fetch orders for the specific user
        const orders = await OrderModel.find({ userId })
            .populate("product_details")
            .populate("delivery_address")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Orders fetched successfully",
            success: true,
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
        })
    }
}
// cancel order
export async function cancelOrderController(req, res) {
    try {
        const { orderId } = req.body
        const userId = req.userId

        if (!orderId) {
            return res.status(400).json({
                message: "Provide order details",
                success: false
            })
        }

        const order = await OrderModel.findById(orderId).populate("product_details")
        if (!order) {
            return res.status(400).json({
                message: "Order not found",
                success: false
            })
        }

        if (order.delivery_status !== "Processing") {
            return res.status(400).json({
                message: "Order cannot be cancelled",
                success: false
            })
        }

        order.delivery_status = "Cancelled"
        await order.save()

        return res.status(200).json({
            message: "Order cancelled successfully",
            success: true,
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

