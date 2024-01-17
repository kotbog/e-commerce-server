import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['Unauthorised', 'User', 'Admin', 'SuperAdmin'],
        default: 'User'
    },
    modified_at: {
        type: Date,
    },
    deleted_at: {
        type: Date
    }
});

User.pre("save", async function() {
    if(this.password) this.password = await bcrypt.hash(this.password, 12)
});

export default mongoose.model("User", User);

