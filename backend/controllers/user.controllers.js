import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import sendMail from "../utils/resend.js";
import { model } from "mongoose";


const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" })
        }
        const token = createtoken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while logging in" })
    }
}

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = createtoken(newuser._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while registering" })
    }
}

// get user
const getCurrentUser = async (req, res) => {
    try {
        const token = req.header("token")
        if (!token) {
            return res.json({ success: false, message: "Token not found" })
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(id).select("-password");
        res.json({ success: true, user })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while getting the user" })
    }
}



// Forget password

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedOTP = await bcrypt.hash(otp, 10);

        user.passwordResetOTP = hashedOTP;
        user.passwordResetOTPExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendMail(
            user.email,
            "Password Reset OTP",
            `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Error while sending OTP"
        });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }
        if (Date.now() > user.passwordResetOTPExpiry) {
            return res.status(401).json({ success: false, message: "OTP expired" })
        }

        const isMatch = await bcrypt.compare(otp, user.passwordResetOTP);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid OTP" })
        }

        res.status(200).json({ success: true, message: "OTP verified successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while verifying OTP" })
    }
}


const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.passwordResetOTP = null;
        user.passwordResetOTPExpiry = null;

        await user.save();
        res.json({ success: true, message: "Password updated. Please login again." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while resetting password" })
    }
}
export { loginUser, registerUser, getCurrentUser, forgotPassword, verifyOtp, resetPassword }