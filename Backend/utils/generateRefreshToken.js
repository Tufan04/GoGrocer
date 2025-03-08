import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import UserModel from "../models/user.model.js"
dotenv.config()

const generateRefreshToken = async ( userId ) => {
    const token = await jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: "7d" }
    )
    const updateRefreshtokenUser = await UserModel.updateOne(
        { _id: userId },
        { refresh_token: token }
    )
    return token
}

export default generateRefreshToken