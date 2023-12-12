import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
    modified_at: {
        type: Date,
    },
    deleted_at: {
        type: Date,

    }
});

User.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12)
});

export default mongoose.model("User", User);

