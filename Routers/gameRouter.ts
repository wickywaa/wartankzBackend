import express, { Express, NextFunction, Request, Response,  } from 'express';
import {joinGameHandler} from  '../handlers/gameHandlers/joinGameHandler'
const gameRouter =  express.Router();
const cors = require('cors')
const  corsOptions = {
    origin:['http://localhost:3000','https://riotbotz.com','91.64.183.66'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  const gameAuth = ((req:Request,res:Response,next:NextFunction)=>{

    const passwordIsCorrect =()=>{
        return true
    }

    if(passwordIsCorrect()){
        next()
    }
  })


  gameRouter.post('/joinGame',gameAuth,joinGameHandler)





  module.exports = gameRouter