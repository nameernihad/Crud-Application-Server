import express from "express";
import { userSignup } from "../controller/user/userSignup";

const userRoute =  express.Router()

userRoute.post('/signup',userSignup)

export default userRoute