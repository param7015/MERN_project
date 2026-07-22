import orderModel from "../models/order.models.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_KEY)


const placeorder = async (req, res) => {
    const frontend_url = "https://mern-project-frontend-1rh6.onrender.com";

    try { // midleware attached userId will come from authMiddle

        const neworder = new orderModel({
            ownerId: req.body.items[0].ownerId,
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await neworder.save();

        await userModel.findByIdAndUpdate(req.body.userId, {
            cartData: {}
        });

        const items = req.body.items || [];

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 2000
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${neworder._id}`,
        });

        res.json({
            success: true,
            session_url: session.url
        });

    } catch (error) {
        console.log("Stripe Error:", error);
        res.json({
            success: false,
            message: "Failed to place order"
        });
    }
};

const verifyorder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Order placed successfully" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Order cancelled" })
        }
    } catch (error) {
        res.json({ success: false, message: "Failed to verify order" })
    }
}


// for the user to see his orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }).sort({ createdAt: -1 })
        res.json({ success: true, data: orders })
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch orders" })
    }
}


// for admin to see all the orders
const listOrders = async (req, res) => {

    try {
        const token = req.cookies.accessToken
        if (!token) {
            res.status(401).json({ success: false, message: "token not found" })
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifiedToken){
            res.status(401).json({success: false, message: "token not verified"})
        }
        const orders = await orderModel.find({ownerId: verifiedToken._id}).sort({ createdAt: -1 });
        res.json({ success: true, data: orders })

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders" })
    }
}


// this is for admin so that he can update status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Order status updated successfully" })
    } catch (error) {
        res.json({ success: false, message: "Failed to update order status" })
    }
}


// for invoice to show to the user

const getOrderDetails = async (req, res) => {

    const { orderId } = req.body
    try {

        if (!orderId) {
            return res.json({ success: false, message: "orderId not found" })
        }
        const orders = await orderModel.findOne({ _id: orderId });
        res.json({ success: true, data: orders })

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch order" })
    }
}


export { placeorder, verifyorder, userOrders, listOrders, updateStatus, getOrderDetails }
