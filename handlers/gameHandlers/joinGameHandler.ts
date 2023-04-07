import { NextFunction, Request, Response } from "express";
import { CreateGameRequest } from "../../interfaces/userInterfaces";
import { checkIfGameOverLap } from "../../firebase";

import { db } from "../../firebase";

export const createGameHandler = (
  req: CreateGameRequest,
  res: Response,
  next: NextFunction
) => {
  const { year, month, newGame } = req.body;
  const { startTime, endTime, map } = req.body.newGame;
  const gameRef = db.ref(`games/${req.body.year}/${req.body.month}`);

  checkIfGameOverLap(year,month,startTime,endTime,map,
    (isOverLap: boolean) => {
      if (isOverLap) {
        return res.status(403).send({
          error: {
            message: "a game already exists during this time dumb ass",
          },
        });
      }

      if (!isOverLap) {
        gameRef.push({ ...req.body.newGame }, (error) => {
          if (error) {
            return res.status(500).send({
              error: {
                message: " create Game failed",
              },
            });
          }
          return res.status(200).send({ success: { message: "game created" } });
        });
      }
    }
  );
};