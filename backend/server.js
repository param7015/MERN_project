import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";


import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// const allowedOrigins = ["https://mern-project-admin-y0zm.onrender.com", "https://mern-project-frontend-1rh6.onrender.com"];

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser())
app.use(express.static("uploads"));


connectDB()

// declaring routes

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/admin", adminRouter)


app.get("/", (req, res) => {
    res.send("API working")
})


app.listen(port, () => {
    console.log(`⚙️  Server started on http://localhost:${port}`)
})

