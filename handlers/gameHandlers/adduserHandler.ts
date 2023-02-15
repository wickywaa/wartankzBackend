import { NextFunction, Response } from "express";
import { AddUserRequest, Player } from "../../interfaces/userInterfaces";
import { firebaseService } from "../../Services/FirebaseService";

import { db } from "../../firebase";
import { FirebaseGame } from "../../interfaces/FirebaseData";

export const addUserHandler = (
  req: AddUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { gameId, userId } = req.body;
  const gameRef = db.ref(`games/${gameId}`);

  gameRef.get().then((snapshot) => {
    const game: FirebaseGame = snapshot.val();
    const timeNow = new Date().getTime();
    const freeSpace = game.playersArray.find((player) =>
      player.playerId.startsWith("Player")
    );

    if (game.startTime < timeNow)
      return res
        .status(400)
        .send({ error: { message: "Too Late to join Game" } });

    if (!freeSpace)
      return res.status(400).send({ error: { message: "Game is Full" } });

    const newPlayers = game.playersArray.map((player) => {
      if (player.botId === freeSpace.botId) {
        return {
          ...freeSpace,
          playerId: userId,
        };
      }
      return player;
    });

    if (newPlayers.length !== game.playersArray.length)
      return res.status(400).send({ error: { message: "Game is Full" } });
    const newGame: FirebaseGame = {
      ...game,
      playersArray: newPlayers,
    };

    firebaseService
      .updateGame(req.body.gameId, newGame)
      .then((response) => {
        console.log(response);
        return res.status(200).send({
          success: {
            message: "game Joined",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send({
          error: {
            message: "unable to create game",
          },
        });
      });
  });
};
