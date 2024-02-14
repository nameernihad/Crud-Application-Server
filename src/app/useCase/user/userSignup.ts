import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../../infra/repository/user/user"
import { AppError } from "../../../utils/error"

export const signupUser=(userRepository:UserRepository)=>{

    return async(user:User):Promise<User>=>{

        const isUserExist=await userRepository.findUserByEmail(user.email)        
        if(isUserExist)throw new AppError('Email is already taken',409)

        const createdUser=await userRepository.createUser(user)
        
        return createdUser
    }
}   