import express from "express";
import { userSignup } from "../controller/user/userSignup";
import { userLogin } from "../controller/user/userLogin";

const userRoute =  express.Router()

userRoute.post('/signup',userSignup)
userRoute.post('/login',userLogin)

export default userRoute