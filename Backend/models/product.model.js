import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        }
    ],
    unit:{
        type: String,
        default: ""
    },
    stock: {
        type : Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: ""
    },
    publish: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

// productSchema.index({name: "text", description: "text"})

const ProductModel = mongoose.model("Product", productSchema)

export default ProductModel