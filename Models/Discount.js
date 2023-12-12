import mongoose from "mongoose";

const Discount = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    discount_percent: {
        type: Number
    },
    active: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model("Discount", Discount);