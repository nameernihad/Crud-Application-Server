import { User } from "../../../domain/entities/user/user"
import { MongoDBUser } from "../../database/model/user"

export type UserRepository ={
    createUser:(user:User)=>Promise<User>;
    findUserByEmail:(email:string)=>Promise<User| null>
}

const userRepositoryImpl=(UserModel:MongoDBUser):UserRepository=>{

    const createUser=async(user:User):Promise<User>=>{
        let newUser=await UserModel.create(user)
        return newUser
    }
    const findUserByEmail = async(email:string):Promise<User>=>{

        const user:User | any =await UserModel.findOne({email})
        return user
    }
   
    
    return {createUser,findUserByEmail}
}

export default userRepositoryImpl;
