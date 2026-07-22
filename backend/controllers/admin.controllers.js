import adminModel from "../models/admin.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"


const generateAccessandRefreshToken = async (adminId) => {
    try {
        const admin = await adminModel.findById(adminId)

        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong while generating tokens",
            error: error.message
        })
    }
}


const adminLogin = async (req, res) => {

    const { email, password } = req.body;
    try {

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.json({ success: false, message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, admin.password)
        if (!matchPassword) {
            return res.json({ success: false, message: "Invalid password" })
        }

        const { accessToken, refreshToken } = await generateAccessandRefreshToken(admin._id);
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // this will give true or false
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        }

        return res.cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                message: "Admin user logged in successfully",
                accessToken
            })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while logging in" })
    }
}

const adminRegister = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        if (
            [name, email, password].some((field) => field?.trim() === "")
        ) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const user = await adminModel.findOne({ email })
        if (user) {
            res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminUser = await adminModel.create({
            name,
            email,
            password: hashedPassword
        })



        return res.json({
            success: true,
            message: "Account created. Please Login"
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while registering admin" })
    }
}


const getProfile = async (req, res) => {
    try {
        const token = await req.cookies.accessToken
        console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: "token not found" })
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await adminModel.findById(verifiedToken._id).select("-password")
        return res.json({ success: true, user })

    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error while getting profile" })
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "token not found" })
        }
        const verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await adminModel.findById(verifiedToken._id)

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token" })
        }
        const accessToken = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" })

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // this will give true or false // need to write it because using localhost & its HTTP server not HTTPS 
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        }
        return res.cookie("accessToken", accessToken, options)
            .json({
                success: true,
                message: "Admin user refreshed successfully"
            })


    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error while refreshing token" })
    }
}

const logout = async (req, res) => {
    try {
        const token = await req.cookies.refreshToken
        if (!token) {
            return res.json({ success: false, message: "token not found" })
        }
        const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const user = await adminModel.findByIdAndUpdate(verifiedToken._id,
            {
                $unset: {
                    refreshToken: 1
                }
            }, {
            new: true
        }
        )

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        }
        return res.clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ success: true, message: "Logout successfully" })

    } catch (error) {
        console.log(error)
        res.status(401)
            .json({ success: false, message: "Error while logging out" })
    }
}







// const addProduct = async (req, res) => {
//     const token = req.cookies.accessToken
//     if (!token) {
//         return res.json({ success: false, message: "token not found" })
//     }
//     const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
//     const user = await adminModel.findById(verifiedToken._id)
//     if (!user) {
//         return res.json({ success: false, message: "Invalid token" })
//     }

//     const { name, price, image } = req.body
//     try {
//         if (!name || !price || !image) {
//             return res.json({ success: false, message: "All fields are required" })
//         }
//         const newProduct = new foodModel({
//             ownerId: verifiedToken._id,
//             name,
//             price,
//             image
//         })
//         await newProduct.save()
//         return res.json({ success: true, message: "Product added successfully" })
//     }
//     catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error while adding product" })
//     }

// }




// const seeproducts = async (req, res) => {

//     try {
//         const token = req.cookies.accessToken
//         if (!token) {
//             return res.json({ success: false, message: "token not found" })
//         }
//         const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
//         if (!verifiedToken) {
//             res.json({ success: false, message: "Invalid token" })
//         }

//         const products = await productModel.find({ ownerId: verifiedToken._id })
//         return res.json({ success: true, products })

//     }
//     catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error while fetching products" })
//     }

// }




export { adminLogin, adminRegister, getProfile, refreshAccessToken, logout }
