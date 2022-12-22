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
