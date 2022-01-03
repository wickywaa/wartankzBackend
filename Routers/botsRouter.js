const express = require('express');
const botRouter = new express.Router();


botRouter.get('/',(req,res)=>{

    res.send({
        message:'here are the bots'
    })
})


module.exports = botRouter

