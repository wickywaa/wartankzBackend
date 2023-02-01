import express, { NextFunction, Request, Response,  } from 'express';
import {createGameHandler,addUserHandler} from  '../handlers';
const gameRouter = express.Router();
const cors = require('cors')
const  corsOptions = {
    origin:['http://localhost:3000','https://riotbotz.com','91.64.183.66'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  const gameAuth = ((req:Request,res:Response,next:NextFunction)=>{

    console.log('made it here')

    const passwordIsCorrect =()=>{
        return true
    }

    if(passwordIsCorrect()){
        next()
    }
  })


  gameRouter.post('/creategame',cors(corsOptions),gameAuth,createGameHandler)

  gameRouter.post('/gameadduser',cors(corsOptions),gameAuth,addUserHandler)





  module.exports = gameRouter