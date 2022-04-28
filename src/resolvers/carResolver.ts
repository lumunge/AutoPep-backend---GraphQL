import { Resolver, Authorized, Arg, Ctx, Mutation, Query } from "type-graphql";
import CarService from "../services/carService";
import { Car, CreateCarData, GetCarData } from "../schemas/carSchema";
import Context from "../types/context";

@Resolver()
export default class CarResolver {
  constructor(private carService: CarService) {
    this.carService = new CarService();
  }

  @Authorized()
  @Mutation(() => Car)
  createCar(@Arg("input") input: CreateCarData, @Ctx() context: Context) {
    const user = context.user!;
    return this.carService.createCar({ ...input, user: user?._id });
  }

  @Query(() => [Car])
  cars() {
    return this.carService.getCars();
  }

  @Query(() => Car)
  car(@Arg("input") input: GetCarData) {
    return this.carService.getCar(input);
  }
}
