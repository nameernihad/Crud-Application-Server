import { Request,Response } from "express";
import { User } from "../../../domain/entities/user/user";
import userRepositoryImpl from "../../../infra/repository/user/user";
import { userModel } from "../../../infra/database/model/user";
import { signupUser } from "../../../app/useCase/user/userSignup";
const db = userModel
const UserRepository = userRepositoryImpl(db)


export const userSignup = async(req:Request,res:Response)=>{
    try {
        const user:User = req.body
        console.log(user)
        const createdUser = await signupUser(UserRepository)(user)
        if(!createdUser)
      {
         res.status(500).json({message:'Something went wrong'})
         return
      }
      res.status(201).json(createdUser)

    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message || 'Somthing went wrong'})
    }
}