import { foodModel } from "../models/food.models.js";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// its for admin to add its food items
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json({ success: false, message: "token not found" })
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!verifiedToken) {
        return res.status(401).json({ success: false, message: "Invalid token" })
    }

    const food = new foodModel({
        ownerId: verifiedToken._id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food added successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

// all food list
const listFood = async (req, res) => {
    try {

        const token = req.cookies.accessToken
        if (!token) {
            return res.json({ success: false, message: "token not found" })
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifiedToken) {
            res.json({ success: false, message: "Invalid token" })
        }

        const foods = await foodModel.find({ ownerId: verifiedToken._id });
        res.json({ success: true, data: foods })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const deleteFood = async (req, res) => {
    try {
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food item deleted successfully" })
        fs.unlink(`uploads/${food.image}`, () => { })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}




// for user to get limited food list to show in the front end
const limitFoodList = async (req, res) => {

    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const foods = await foodModel.find({}).skip(skip).limit(limit);
        res.json({ success: true, data: foods });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}




// for user to search food with the name
const searchFood = async (req, res) => {

    const { query } = req.query;
    try {

        if (!query) {
            return res.status(400).json({ success: false, message: "Please enter a item name to search" })
        }

        const searchQuery = query.trim().toLowerCase().replace(/\s+/g, " ")

        const foods = await foodModel.find({
            name: { $regex: searchQuery, $options: "i" }
        })

        if (foods.length === 0) {
            return res.status(404).json({ success: false, message: "Uh oh! Looks like this item is not available. " })
        }

        res.status(200).json({ success: true, data: foods })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}




// AI chatController For ai assistant

const chatController = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message)
            return res.status(400).json({ success: false, message: "Message is required" });

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are a food ordering assistant.

Reply ONLY in JSON.

Chat:
{
"type":"chat",
"reply":"Hello!"
}

Food search:
{
"type":"search",
"name":"pizza",
"category":null,
"maxPrice":300,
"isVeg":true
}

User: ${message}
`;

        const result = await model.generateContent(prompt);

        let text = result.response.text().replace(/```json|```/g, "").trim();
        const filters = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);

        if (filters.type === "chat") {
            return res.json({
                success: true,
                type: "chat",
                message: filters.reply,
            });
        }

        const query = {};

        // Search by food name
        if (filters.name) {
            query.name = { $regex: filters.name, $options: "i" };
        }

        /* using $regex is for searching the items like icecream cake. cake at 
        the end it will search if not it will only check the word
        
        using $options: "i" is for case insensitive 
        search like it will search cake, Cake, CAKE, caKE etc*/

        // Search by category
        if (filters.category) {
            query.category = { $regex: filters.category, $options: "i" };
        }

        // Veg filter
        if (filters.isVeg !== null) {
            query.isVeg = filters.isVeg;
        }

        // Price filter
        if (filters.maxPrice) {
            query.price = { $lte: filters.maxPrice };
        }

        const foods = await foodModel.find(query);

        res.json({
            success: true,
            data: foods,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export { addFood, listFood, deleteFood, limitFoodList, searchFood, chatController };