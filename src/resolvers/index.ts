import CarResolver from "./carResolver";
import UserResolver from "./userResolver";

export const resolvers = [UserResolver, CarResolver] as const;
