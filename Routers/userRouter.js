const express = require('express');
const userRouter = new express.Router()


userRouter.get('/home',(req,res)=>{

    res.send({message:'hello'})

    console.log('we have contact')
})


module.exports =  userRouter