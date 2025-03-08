import { Router } from "express"
import { forgetPasswordController, loginController, logoutController, refreshToken, registerUserController,resetPassword,updateUserDetails,uploadAvatar,userDetails,verifyEmailController, verifyForgetPasswordOtp } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const userRouter = Router()

userRouter.post("/register", registerUserController)
userRouter.post("/verify-email", verifyEmailController)
userRouter.post("/login", loginController)
userRouter.get("/logout", auth, logoutController)
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar)
userRouter.put("/update-user", auth, updateUserDetails)
userRouter.put("/forget-password",forgetPasswordController)
userRouter.put("/verify-forget-password-otp", verifyForgetPasswordOtp)
userRouter.put("/reset-password", resetPassword)
userRouter.post("/refresh-token", refreshToken)
userRouter.get("/user-details", auth, userDetails)

export default userRouter