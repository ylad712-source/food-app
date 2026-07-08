import express from  "express";
import {signup, login, forgotPassword, verifyOtp, resetPassword } from "../controllers/userController.js"


const userRouter =express.Router();

userRouter.post("/register",signup);
userRouter.post("/login",login);
userRouter.post("/forget-password",forgotPassword)
userRouter.post("/verify-otp",verifyOtp)
userRouter.post("/reset-password",resetPassword)

export default userRouter