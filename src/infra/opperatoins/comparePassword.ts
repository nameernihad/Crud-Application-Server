import bcrypt from "bcrypt";
import { AppError } from "../../utils/error";

export const comparePassword = (password: string,hashedPassword:string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, function(err:any, result) {
            if (result) {
                resolve(result)
            }else{
                reject(new AppError("password is Incorrect, Try again",500));
                
            }
        });
    });
};
