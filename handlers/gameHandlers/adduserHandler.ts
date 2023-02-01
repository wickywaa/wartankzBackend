import { NextFunction, Request, Response } from "express";
import { AddUserRequest, CreateGameRequest, Player} from  '../../interfaces/userInterfaces';

import {} from  '../gameHandlers/'

import {db} from  '../../firebase';

export const addUserHandler = ((req:AddUserRequest, res:Response, next:NextFunction)=>{

    const gameRef = db.ref(`games/${req.body.gameId}`);
    gameRef.get().then((snapshot)=>{
        const players:Player[] = snapshot.val();


        console.log(players)

        return res.status(200).send('')

    })
   
  })