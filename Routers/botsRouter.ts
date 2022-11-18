import express, { Express, NextFunction, Request, Response } from 'express';
const botRouter =  express.Router();
const cors = require('cors')
const {showlistofBotz,getbotSessionId,updateBotSessionId} = require('./../database/mongodb')
const  {createSessionId,getSessionTokenForWebuser} = require ('../vonageApi/sessionId')
import  {startGame}  from '../app';
const  corsOptions = {
    origin:['http://localhost:3000','https://riotbotz.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  const auth = ((req:Request,res:Response,next:NextFunction)=>{

    const passwordIsCorrect =()=>{
        return true
    }

    if(passwordIsCorrect()){
        next()
    }
  })


botRouter.get('/getallbotz',cors(corsOptions),(req:Request,res:Response)=>{

    showlistofBotz((botz:string[])=>{
        res.send(botz)
    })
})
botRouter.get('/getbotsessionidwithtoken',auth,(req:Request,res:Response)=>{
    const botId = req.query.botId;
    getbotSessionId(botId,(session:string)=>{
        
        res.send(session);
    })
})

botRouter.post('/createAccessToken',auth,(req:Request,res:Response) => {
    const {id,endTime,botId} = req.body.tokenRequest
    console.log(req.body)

    getSessionTokenForWebuser('subscriber',id,endTime, (token:string)=>{
        res.send(token)
    })
})

botRouter.get('/createsession',auth,(req:Request,res:Response)=>{
    const botId = req.body.botId;

    createSessionId((session:{sessionId:string})=>{

            res.send(session)
        
    })
})



module.exports = botRouter

