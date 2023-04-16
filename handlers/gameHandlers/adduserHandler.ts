import { NextFunction, Response } from "express";
import { AddUserRequest, Player } from "../../interfaces/userInterfaces";


export const addUserHandler = (
  req: AddUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { gameId, userId } = req.body;

};
