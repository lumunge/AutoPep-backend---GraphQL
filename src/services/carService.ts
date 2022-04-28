import { CarModel, CreateCarData, GetCarData } from "../schemas/carSchema";
import { User } from "../schemas/userSchema";

class CarService {
  // post a car
  async createCar(input: CreateCarData & { user: User["_id"] }) {
    return CarModel.create(input);
  }

  // get all cars
  async getCars() {
    return CarModel.find().lean();
  }

  // get single car
  async getCar(input: GetCarData) {
    return CarModel.findOne(input).lean();
  }
}

export default CarService;
