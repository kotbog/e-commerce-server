import mongoose from "mongoose";

const CartItem = new mongoose.Schema({
    user_id: {
        type: String,
        ref: "User",
    },
    product_id: {
        type: String,
        ref: "Product",
    },
    quantity: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    modified_at: {
        type: Date,
    },
});

export default mongoose.model("CartItem", CartItem);
