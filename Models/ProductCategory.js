import mongoose from "mongoose";

const ProductCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
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

export default mongoose.model("ProductCategory", ProductCategory);