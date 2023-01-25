import { NextFunction, Request, Response } from "express";
import { CreateGameRequest} from  '../../interfaces/userInterfaces';

import {db} from  '../../firebase';

export const createGameHandler = ((req:CreateGameRequest, res:Response, next:NextFunction)=>{

    const gameRef = db.ref(`games/`);

    gameRef.push({...req.body.newGame},(error)=>{

      if(error){
        return res.status(500).json({
          error:{
            message:' create Game failed'
          }
        })
      }
    return res.status(200).send('')
    })
   
  })




















 /*  gameRef.once("value",(snapshot)=>{
    const playerIds = Object.keys(snapshot.val().playersArray)
    const players =playerIds.map((id)=>{
        return {
          key:id,
          player :snapshot.val().playersArray[id]
        }
          
      })
      const userAlreadyInGame =players.find((player)=>player.player.playerId === uid) 
  
      const selectedPlayer = players.find((item) => {
       return   item.player.playerId.startsWith('Player ')
      })

      if( userAlreadyInGame ){
        return setResponse(404, 'failed')
      }

      if(selectedPlayer && userAlreadyInGame) {
        console.log(selectedPlayer)
      }

      const updatedPlayer =  {
        ...selectedPlayer?.player,
        playerId:`${uid}`
      }
    gameRef.set(updatedPlayer,()=>{
        console.log('saved player to game ')
    })
}) */