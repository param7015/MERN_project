import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required:true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true })


const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel