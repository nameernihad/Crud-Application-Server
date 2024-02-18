import bcrypt from "bcrypt";
import { AppError } from "../../utils/error";

export const    hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err: any, hash: string) {
            if (hash) {
                resolve(hash); 
            } else {
                reject(new AppError('Password not hashed', 409)); 
            }
        });
    });
};
