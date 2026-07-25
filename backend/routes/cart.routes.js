import { addToCart, removeFromCart, getCart, getCartItems } from "../controllers/cart.controllers.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/getCartItems", getCartItems);

export default cartRouter;