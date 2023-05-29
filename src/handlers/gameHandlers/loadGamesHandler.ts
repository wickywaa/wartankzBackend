import { NextFunction, Request, Response } from "express";
import { CreateGameRequest } from "../../interfaces";
require('../../database/mongoose');
import {Game} from './../../database/dbmodels/game.dbmodel';

export const loadGamesHandler = (req:Request, res: Response, next: NextFunction) => {
 
  Game.find({}).then((Games)=>{
    console.log(Games)
    res.json(Games)
  })
  .then(()=>{
    next()
  }).
  catch((e)=>{
    res.status(500).send()
  })
};
