import express from "express";
import { loginUser, registerUser, getCurrentUser, forgotPassword, verifyOtp, resetPassword } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getuser", getCurrentUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/changePassword", resetPassword);

export default userRouter;