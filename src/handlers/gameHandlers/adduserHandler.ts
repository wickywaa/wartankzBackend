import { NextFunction, Response } from "express";
import { AddUserRequest, IGame, Player, databaseGame } from "../../interfaces";
import {Game} from '../../database/dbmodels/game.dbmodel';


export const addUserHandler = (
  req: AddUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { gameId, userId  } = req.body;
  Game.findById(gameId).then((game)=>{
    if(!game) {
      return res.status(500).send()
    }
    const availableSpot = game.playersArray.find((player)=>player.playerId.startsWith('Player '))
    if(!availableSpot) {
     return res.status(401).send({
        message:'player is already in this game'
      })
    }
    const newPlayers = game.playersArray.map((player)=>{
      if(player.playerId.startsWith(availableSpot.playerId)) {
        return {
            playerId: userId,
            botId: player.botId,
            botName: player.botName,
        }
      }
      return player
    })
    if( newPlayers) {
      Game.findOneAndUpdate({playersArray:newPlayers}).then((answer)=>{
        console.log(answer)
        res.status(200)
      }).catch(()=>{
        res.status(500).send();
      })
    }

  });
  



  next()


};
