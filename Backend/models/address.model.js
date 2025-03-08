import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    address_line: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number,
        default: null
    },
    mobile: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const AddressModel = mongoose.model("Address", addressSchema)

export default AddressModel