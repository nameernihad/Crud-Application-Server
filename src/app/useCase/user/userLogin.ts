import { User } from "../../../domain/entities/user/user";
import { comparePassword } from "../../../infra/opperatoins/comparePassword";
import { CreateToken, TokenPair } from "../../../infra/opperatoins/jsonWebToken";
import { UserRepository } from "../../../infra/repository/user/user";
import { AppError } from "../../../utils/error";


export const loginUser = (userRepository: UserRepository) => {
  return async (user: User): Promise<TokenPair> => {
    const { email, password } = user;

    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
      const compared = await comparePassword(password, existingUser.password);

      if (compared) {
        if (existingUser._id) {
          const tokens = await CreateToken(existingUser._id);
          return tokens;
        } else {
          throw new AppError("User ID not found", 500);
        }
      } else {
        throw new AppError("Invalid credentials", 401);
      }
    } else {
      throw new AppError("The user does not exist", 401);
    }
  };
};
