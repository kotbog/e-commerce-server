import mongoose from "mongoose";

const ProductInventory = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    modified_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    }
});

module.exports = mongoose.model("ProductInventory", ProductInventory);