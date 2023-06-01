import { NextFunction, Response } from "express";
import { AddUserRequest, IGame, Player, databaseGame } from "../../interfaces";
import {Game} from '../../database/dbmodels/game.dbmodel';


export const addUserHandler = (
  req: AddUserRequest,
  res: Response,
  next: NextFunction
) => {

  console.log('hehehhe')
  console.log(req.body.gameId)
  const { gameId, userId  } = req.body;
  Game.findById(gameId).then((game)=>{
    if(!game) {
      return res.status(500).send()
    }
    const availableSpot = game.playersArray.find((player)=>player.playerId.startsWith('Player '));
    const userFound = game.playersArray.find((player)=> player.playerId === userId)
    if(userFound) {
      return res.status(401).send({
        message:'user Already in game'
      })
    }

    if(!availableSpot) {
      console.log('here')
     return res.status(401).send({
        message:'No Spots available'
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
      Game.findOneAndUpdate({_id: req.body.gameId},{playersArray:newPlayers}).then((answer)=>{
        console.log(newPlayers)
        console.log('here is the ',answer)
        res.status(200).send();
        next()
        return 
      }).catch((e)=>{
        console.log(e)
        res.status(500).send();
        next()
      })
    }
  });
};
