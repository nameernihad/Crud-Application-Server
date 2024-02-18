import { User } from "../../../domain/entities/user/user";
import { hashPassword } from "../../../infra/opperatoins/passwordHasher";
import { UserRepository } from "../../../infra/repository/user/user";
import { AppError } from "../../../utils/error";

export const signupUser = (userRepository: UserRepository) => {

    return async (user: User): Promise<User> => {
        const { name, email, password } = user;

        const isUserExist = await userRepository.findUserByEmail(email);

        if (isUserExist) {
            throw new AppError('Email is already taken', 409);
        }

        const hashedPassword = await hashPassword(password);

        const newUser:User = {
            name: name,
            email: email,
            password: hashedPassword
        };

        const createdUser = await userRepository.createUser(newUser);

        return createdUser;
    };
};
