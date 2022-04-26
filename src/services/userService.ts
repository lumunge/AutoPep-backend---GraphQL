import {
  CreateUserData,
  LoginUserData,
  UserModel,
} from "../schemas/userSchema";
import Context from "../types/context";
import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/tokens";

class UserService {
  async createUser(input: CreateUserData) {
    return UserModel.create(input);
  }

  async login(input: LoginUserData, context: Context) {
    // error
    const err = "Invalid credentials!";
    // get user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(err);
    }

    // validate passwords
    const validPassword = await bcrypt.compare(input.password, user.password);

    if (!validPassword) {
      throw new ApolloError(err);
    }

    // sign jwt token
    const token = signJWT(user);

    // set cookie
    context.res.cookie("accessToken", token, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return token;
  }
}

export default UserService;
