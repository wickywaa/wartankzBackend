import { NextFunction, Request, Response } from "express";
import { createAccessTokenRequest } from "../../interfaces";


export const addBotHandler = (
    req: createAccessTokenRequest,
    res: Response,
    next: NextFunction
  ) => {
    const date = new Date();
    const {startTime, endTime}  = req.body;

    if( date.getTime() < endTime) {
        res.status(403).json({error:{
            message:'Game Expired sorry'
        }})
    }




  }