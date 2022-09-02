const express = require('express');
const botRouter = new express.Router();
const cors = require('cors')
const {showlistofBotz,getbotSessionId,updateBotSessionId} = require('./../database/mongodb')
const  {createSessionId,getSessionTokenForWebuser} = require ('../vonageApi/sessionId')
const  corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  const auth = ((req,res,next)=>{

    const passwordIsCorrect =()=>{
        return true
    }

    if(passwordIsCorrect){
        next()
    }
  })


botRouter.get('/getallbotz',cors(corsOptions),(req,res)=>{

    showlistofBotz((botz)=>{
        res.send(botz)
    })
})
botRouter.get('/getbotsessionidwithtoken',auth,(req,res)=>{
    console.log('reques here')
    const botId = req.query.botId;
    getbotSessionId(botId,(session)=>{
        
        res.send(session);
    })
})

botRouter.post('/createAccessToken',auth,(req,res) => {
    const {id,endTime} = req.body.tokenRequest

    getSessionTokenForWebuser(id,endTime, (token)=>{

        console.log('callback has been called')
        console.log('here is the token', token)
        res.send(token)
    })
})

botRouter.post('/createsession',auth,(req,res)=>{
    const botId = req.body.botId;

    console.log(req.body)

    createSessionId(req.body.botId,(session)=>{

        updateBotSessionId(botId, session.sessionId,()=>{
            res.send(session)
        });
        
    })
})



module.exports = botRouter

