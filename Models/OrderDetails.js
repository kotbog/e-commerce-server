import mongoose, {Mongoose, Types} from "mongoose";

const OrderDetails = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number,
    },
    status: {
      type: String,
        enum: ['Done', 'Processing', 'Failed'],
        default: 'Processing'
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    modified_at: {
        type: Date,
    },
});

export default mongoose.model("OrderDetails", OrderDetails);