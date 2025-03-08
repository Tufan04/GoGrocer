import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    paymentId: {
        type: String,
        default: ""
    },
    // payment_status: {
    //     type: String,
    //     enum: ["Pending", "Success", "Failed"],
    //     default: ""
    // },
    payment_mode: {
        type: String,
        enum: ["Online", "Cash On Delivery"],
        default: "Cash On Delivery"
    },
    delivery_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    delivery_status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing"
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model("Order", orderSchema)

export default OrderModel