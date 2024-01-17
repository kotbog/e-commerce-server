import mongoose from "mongoose";

const PaymentDetails = new mongoose.Schema({
    amount: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
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

export default mongoose.model("PaymentDetails", PaymentDetails);