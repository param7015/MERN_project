import userModel from "../models/user.model.js"
import { foodModel } from "../models/food.models.js"

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId }); // coming from middleware
        let cartData = await userData.cartData;

        if (!cartData[req.body.foodId]) {
            cartData[req.body.foodId] = 1;
        } else {
            cartData[req.body.foodId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while adding item" })
    }
}



const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData

        if (cartData[req.body.foodId] > 0) {
            cartData[req.body.foodId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item removed from cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while removing item" })
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while getting the items" })
    }
}


const getCartItems = async (req, res) => {
    try {
        const { foodIds } = req.body;

        const foods = await foodModel.find({ _id: { $in: foodIds } })

        res.json({ success: true, foods });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while getting the items" })
    }
}


export { addToCart, removeFromCart, getCart, getCartItems }   
