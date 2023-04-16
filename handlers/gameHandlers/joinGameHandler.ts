import { NextFunction, Request, Response } from "express";
import { CreateGameRequest } from "../../interfaces/userInterfaces";

export const createGameHandler = (req: CreateGameRequest, res: Response, next: NextFunction) => {
  const { year, month, newGame } = req.body;
  const { startTime, endTime, map } = req.body.newGame;
};
