import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({    
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    }
}, {timestamps: true})

export const foodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);