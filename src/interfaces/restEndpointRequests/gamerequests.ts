import { IGame } from "../gameInterfaces";

export interface CreateGameRequest{
    body: {
      idToken: string;
      month: string;
      year: string;
      newGame: IGame
    };
  }