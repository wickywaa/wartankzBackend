import { NextFunction, Request, Response } from "express";
require('../../database/mongoose');
import {Game} from './../../database/dbmodels/game.dbmodel';

export const loadGamesHandler = (req:Request, res: Response, next: NextFunction) => {

  const fromDateQuery = req.query.fromDate;
  const toDateQuery = req.query.startDate;
  
 
  Game.find({}).then((Games)=>{
   
    res.json(Games)
  })
  .then(()=>{
    next()
  }).
  catch((e)=>{
    res.status(500).send()
  })
};
