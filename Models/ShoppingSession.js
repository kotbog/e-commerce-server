import mongoose from "mongoose";

const ShoppingSession = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    modified_at: {
        type: Date,
    }
});

export default mongoose.model("ShoppingSession", ShoppingSession);