import express from "express";
import { addFood, listFood, deleteFood, chatController, limitFoodList, searchFood, adminStatus } from "../controllers/food.controllers.js";
import verifyAdminToken from "../middleware/adminAuth.middleware.js";
import multer from "multer";


const foodRouter = express.Router();

// image uploading engine 

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // date method is only for the different filename and avoid duplicate data
    }
})


const upload = multer({storage})


// routes
foodRouter.post("/add",verifyAdminToken, upload.single("image"), addFood)
foodRouter.get("/list", verifyAdminToken, listFood)
foodRouter.post("/remove", deleteFood)
foodRouter.post("/chat", chatController)
foodRouter.get("/limitFoodList", limitFoodList)
foodRouter.get("/searchFood", searchFood)
foodRouter.post("/adminStatus", verifyAdminToken, adminStatus)


export default foodRouter;