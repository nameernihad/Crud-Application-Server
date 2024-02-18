import jwt from "jsonwebtoken";
import { AppError } from "../../utils/error";

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export const CreateToken = async (userId: string): Promise<TokenPair> => {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
            throw new AppError("Access token secret or refresh token secret is not defined", 500);
        }
        // Creating an access token
        const accessToken = jwt.sign({
            id: userId
        }, process.env.ACCESS_TOKEN_SECRET!, { 
            expiresIn: '10m'
        });

        // Creating a refresh token
        const refreshToken = jwt.sign({
            id: userId
        }, process.env.REFRESH_TOKEN_SECRET!, { // Note the '!' to indicate non-null assertion
            expiresIn: '1d'
        });

        return { accessToken, refreshToken };

    } catch (error) {
        throw error instanceof AppError ? error : new AppError('Failed to create token', 500);       
    }
}
