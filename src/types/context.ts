import { Request, Response } from "express";
import { User } from "../schemas/userSchema";

interface Context {
  req: Request;
  res: Response;
  user: User | null;
}

export default Context;
