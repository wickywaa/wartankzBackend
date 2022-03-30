const express = require('express');
const userRouter = new express.Router()
const cors = require('cors')
const  corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


userRouter.get('/home',cors(corsOptions),(req,res)=>{

    res.send({message:'hello'})
})

module.exports =  userRouter