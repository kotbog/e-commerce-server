import mongoose from "mongoose";

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    desc: {
        type: String
    },
    images: {
        type: [String]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    color: {
        type: String
    },
    SKU: {
        type: String,
        required: [true, "SKU is required"]
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    modified_at: {
        type: Date,
    },
    deleted_at: {
        type: Date,
    },
    category: {
        type: String,
        ref: 'ProductCategory'
    },
    inventory_id: {
        type: mongoose.Types.ObjectId,
        ref: "ProductInventory"
    },
    discount_id: {
        type: mongoose.Types.ObjectId,
        ref: "Discount"
    }
});

export default mongoose.model("Product", Product);