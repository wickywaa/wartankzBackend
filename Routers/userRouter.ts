const express = require('express');
const userRouter = new express.Router()
const {createUser} = require('../database/mongodb')
const cors = require('cors')
const  corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ["GET", "POST"]
  }


userRouter.get('/home',cors(corsOptions),(req:any,res:any)=>{

    res.send({message:'hello'})
})

userRouter.post('/createNewUser',cors(corsOptions),(req:any,res:any) => {
  console.log('here is the request,', req)
  console.log(req.body.user)
    createUser(req.body,()=>{
      res.status(200).send()
    });
})

module.exports =  userRouter
