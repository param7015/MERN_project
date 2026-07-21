import express from "express";
import { adminLogin, adminRegister, getProfile, refreshAccessToken, logout} from "../controllers/admin.controllers.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.get("/getprofile", getProfile);
adminRouter.post("/refresh", refreshAccessToken);
adminRouter.post("/logout", logout);

export default adminRouter;