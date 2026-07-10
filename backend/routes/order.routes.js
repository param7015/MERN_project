import express from "express";
import { placeorder, verifyorder, userOrders, listOrders, updateStatus, getOrderDetails } from "../controllers/order.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", authMiddleware, placeorder);
orderRouter.post("/verify", verifyorder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/listorders", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.post("/getorderdetails", getOrderDetails);

export default orderRouter