import { AppError } from "../../../utils/error";
import { User } from "./user";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+])[A-Za-z\d!@#$%^&*()-=_+]{8,}$/;


//signup validater
export const signupValidator = (user: User) => {
    const { name, email, password } = user;

    if (!name || name.trim() === "") {
        throw new AppError("Name is required", 400);
    }

    if (!email || !emailRegex.test(email)) {
        throw new AppError("Invalid email address", 400);
    }

    if (!password || !passwordRegex.test(password)) {
        throw new AppError("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long", 400);
    }

    return true;
};

export const loginValidator = (user:User)=>{
    const {email,password} = user
    
    if (!email || !emailRegex.test(email)) {
        throw new AppError("Invalid email address", 400);
    }

    if (!password || !passwordRegex.test(password)) {
        throw new AppError("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long", 400);
    }

    return true;

}