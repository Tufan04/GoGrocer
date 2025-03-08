import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { forgetPasswordEmailTemplate, verifyEmailTemplate } from "../utils/emailTemplates.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";

// register user 
export async function registerUserController(req, res) {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name Email and Password is required",
                success: false
            })
        }
        // check user already exist or not 
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            // 409 conflict like already exist 
            return res.status(409).json({
                message: "Email Already Register",
                success: false
            })
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10)
        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = await UserModel.create(payload)

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email/${newUser._id}`
        const verifyEmail = sendEmail({
            sendTo: email,
            subject: "Verify Your Email",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })
        return res.status(201).json({
            message: "Verify Your Email",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// verify email 
export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body
        const user = await UserModel.findById(code)
        console.log(user);
        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                success: false
            })
        }
        if (user.verify_email) {
            return res.status(200).json({
                message: "Already Verified",
                success: true,
                already_verified: true
            })
        }
        user.verify_email = true
        await user.save()
        return res.status(200).json({
            message: "Verification Successfully",
            success: true,
            already_verified: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// login user 
export async function loginController(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Provide Email and Password",
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not register",
                success: false
            })
        }
        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Your Account is not Active",
                success: false
            })
        }
        if (!user.verify_email) {
            return res.status(400).json({
                message: "Verify Your Email",
                success: false
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) {
            return res.status(400).json({
                message: "Check your credientials",
                success: false
            })
        }

        user.last_login_date = new Date().toISOString()
        await user.save()

        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })

        return res.status(200).json({
            message: "User Login Successfully",
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// logout user 
export async function logoutController(req, res) {
    try {
        const userId = req.userId

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: ""
        })

        return res.status(200).json({
            message: "Logout Successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// upload user avatar
export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId        //from auth middleware
        const image = req.file       //from multer middleware
        const upload = await uploadImageCloudinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return res.status(201).json({
            message: "Avatar upload Successful",
            success: true,
            data: {
                userId: userId,
                avatar: upload.url
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

//update user details
export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId       // from auth middleware
        const { name, oldPassword, newPassword, mobile } = req.body

        if ((newPassword && !oldPassword) || (!newPassword && oldPassword)) {
            return res.status(400).json({
                message: "Both Password is required",
                success: false
            })
        }
        if (oldPassword && newPassword) {
            const user = await UserModel.findById(userId)
            const verifyOldPassword = await bcrypt.compare(oldPassword, user.password)
            if (!verifyOldPassword) {
                return res.status(400).json({
                    message: "Check your password",
                    success: false
                })
            }
        }

        let hashPassword = ""
        if (newPassword) {
            hashPassword = await bcrypt.hash(newPassword, 10)
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            ...(name && { name: name }),
            ...(mobile && { mobile: mobile }),
            ...(newPassword && { password: hashPassword }),

        }, { new: true })

        return res.status(200).json({
            message: "Updated Successfully",
            success: true,
            data: updateUser
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// forget password
export async function forgetPasswordController(req, res) {
    try {
        const { email } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not exist",
                success: false
            })
        }
        const otp = generateOtp()
        const expireTime = Date.now() + 60 * 60 * 1000  // 1hr

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forget_password_otp: otp,
            forget_password_expire: new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forget Password",
            html: forgetPasswordEmailTemplate({
                name: user.name,
                otp
            })
        })

        return res.status(200).json({
            message: "OTP send successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

//verify forget password otp
export async function verifyForgetPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body
        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide OTP",
                success: false
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not exist",
                success: false
            })
        }

        const currenttime = new Date().toISOString()
        // check OTP expire or not
        if (user.forget_password_expire < currenttime) {
            return res.status(400).json({
                message: "OTP expired",
                success: false
            })
        }
        // OTP doesnot match
        if (otp !== user.forget_password_otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                success: false
            })
        }
        // OTP match
        if (otp === user.forget_password_otp) {

            // user.forget_password_otp = null
            // user.forget_password_expire = null
            // await user.save()

            return res.status(200).json({
                message: "Verification Successful",
                success: true
            })
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// reset the password
export async function resetPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Invalid credientials",
                success: false
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not Exist",
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Password Does not match",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10)

        const update = await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword
        })

        return res.status(200).json({
            message: "Password Updated Successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// refresh token
export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken || req.headers.Authorization?.splt(" ")[1]

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized Access",
                success: false
            })
        }
        const verifyToken = await jwt.verify(refreshToken, process.env.JWT_SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return res.status(401).json({
                message: "Token Expire",
                success: false
            })
        }
        const userId = verifyToken?.id
        const newAccessToken = await generateAccessToken(userId)
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })

        return res.status(200).json({
            message: "new Access token generated",
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

// get user login details
export async function userDetails(req, res) {
    const userId = req.userId
    try {
        const user = await UserModel.findById(userId).select("-password -refresh_token")
        return res.status(200).json({
            message: "User Details",
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}