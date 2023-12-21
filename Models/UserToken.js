import mongoose, { Schema } from "mongoose";

const UserToken = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: 30 * 86400 // 30 days
    }
})

export default mongoose.model("UserToken", UserToken);