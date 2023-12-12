import mongoose from "mongoose";

const ProductImage = new mongoose.Schema({
    base64: String,
    imageFormat: String
})

export default mongoose.model("ProductImage", ProductImage);