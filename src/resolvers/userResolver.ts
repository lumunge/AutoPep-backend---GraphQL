import { Mutation, Resolver, Arg, Ctx, Query } from "type-graphql";
import { CreateUserData, User, LoginUserData } from "../schemas/userSchema";
import UserService from "../services/userService";
import Context from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserData) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginUserData, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  curr(@Ctx() context: Context) {
    return context.user;
  }
}
