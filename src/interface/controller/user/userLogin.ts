import { Request, Response } from "express";
import { User } from "../../../domain/entities/user/user";
import userRepositoryImpl from "../../../infra/repository/user/user";
import { userModel } from "../../../infra/database/model/user/user";
import { loginValidator } from "../../../domain/entities/user/userValidater";
import { loginUser } from "../../../app/useCase/user/userLogin";
const db = userModel;
const UserRepository = userRepositoryImpl(db);


export const userLogin = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const validated = await loginValidator(user)
    if(validated){
      const tokens = await loginUser(UserRepository)(user)
      res.status(200).json({message:'User Successfully  Logged in',  tokens});
    }
   
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Somthing went wrong" });
  }
};
