import mongoose from "mongoose";

const CartItem = new mongoose.Schema({
    session_id: {
        type: mongoose.Types.ObjectId,
        ref: 'ShoppingSession'
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    modified_at: {
        type: Date,
    }
});

export default mongoose.model("CartItem", CartItem);