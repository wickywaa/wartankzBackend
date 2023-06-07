import { NextFunction, Request, Response } from "express";
import { CreateGameRequest } from "../../interfaces";
require('../../database/mongoose');
import {Game} from './../../database/dbmodels/game.dbmodel';
import mongoose from "mongoose";

export const createGameHandler = (req: CreateGameRequest, res: Response, next: NextFunction) => {

  
  const { year, month, newGame } = req.body;
  const { startTime, endTime, map } = req.body.newGame;
  const newGameWithId = {...req.body.newGame,_id: new mongoose.Types.ObjectId().toHexString()}
  const game = new Game(newGameWithId)
  game.save().then((reply)=>{

    console.log(reply)
  })
  .then(()=>{
    next()
  }).
  catch((e)=>{
    console.log(e)
    next()
  })
};
