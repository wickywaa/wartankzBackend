const express = require('express');
const botRouter = new express.Router();
const cors = require('cors')
const {showlistofBotz} = require('./../database/mongodb')
const  corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


botRouter.get('/getallbotz',cors(corsOptions),(req,res)=>{

    console.log('requested the botz')

    showlistofBotz((botz)=>{
        res.send(botz)
    })
})


module.exports = botRouter

