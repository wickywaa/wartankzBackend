import { NextFunction, Request, Response } from "express";
require('../../database/mongoose');
import {Game} from './../../database/dbmodels/game.dbmodel';

export const loadGamesHandler = (req:Request, res: Response, next: NextFunction) => {

  const fromDateQuery:string = req.query.fromDate as string;
  const toDateQuery:string  = req.query.toDate as string;

  console.log('from date',fromDateQuery);
  console.log(' to date',toDateQuery);

 
  Game.find({
    gameStartDate:{
      $gte: new Date(fromDateQuery)
    },
    gameEndDate:{
      $lt: new Date(toDateQuery)
    }
  }).then((Games)=>{
    console.log(Games)
    res.status(200).json(Games)
  })
  .then(()=>{
    next()
  }).
  catch((e)=>{
    console.log(e)
    res.status(500).send()
  })
};
