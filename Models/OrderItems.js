import mongoose from "mongoose";

const OrderItems = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderDetails"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
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

export default mongoose.model("OrderItems", OrderItems);