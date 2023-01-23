import { NextFunction, Request, Response } from "express";
import { JoinGameRequest } from  '../../interfaces/userInterfaces'
import {db} from  '../../firebase';

export const joinGameHandler = ((req:JoinGameRequest, res:Response, next:NextFunction)=>{

    const gameRef = db.ref(`games/${req.body.gameId}`);
    const uid= req.body.userId;

    const setResponse = (status:number, message:string)=> {
        console.log(status, message)

    }

    gameRef.once("value",(snapshot)=>{
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
    })


  })