import { Request } from "express";

export interface user {
  name: string;
  confirmedEmail: string;
  preferred_username: string;
  location: string;
  rank: string;
  sub: string;
}

export interface IcognitoUser {
  attributes: user;
}

export interface userobject {
  Action: string;
  Username: string;
  UserId: string;
  email: string;
  socketId: string;
}

export interface botObject {
  botId: string;
  socketId: string;
}

export interface messageObject {
  userName: string;
  message: string;
}

export interface gameInfo {
  id: string;
  endTime: number;
  botId: string;
}

export interface RequestCustom extends Request {
  body: {
    idToken: string;
  };
}
export interface RequestBotId extends Request {
  body: {
    idToken: string;
    botId: string;
    gameId: string;
  };
}

export interface Player {
  playerId: string;
  botId: string;
  botName: string;
}
export interface newGame {
  gameType: string;
  map: string;
  numberOfPlayers: number;
  playersArray: Player[];
  duration: number;
  gameDate: string;
  startTime: number;
  endTime: number;
  credits: number;
}

export interface CreateGameRequest extends Request {
  body: {
    idToken: string;
    month: string;
    year: string;
    newGame: newGame
  };
}

export interface AddUserRequest extends Request {
  body: {
    idToken: string;
    gameId: string;
    userId: string
  };
}
