import express from "express";
import { addFood, listFood, deleteFood, chatController, limitFoodList, searchFood } from "../controllers/food.controllers.js";
import multer from "multer";


const foodRouter = express.Router();

// image uploading engine 

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage})


// routes
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", deleteFood)
foodRouter.post("/chat", chatController)
foodRouter.get("/limitFoodList", limitFoodList)
foodRouter.get("/searchFood", searchFood)


export default foodRouter;