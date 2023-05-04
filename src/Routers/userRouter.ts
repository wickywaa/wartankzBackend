import { NextFunction, Response } from "express";

import { RequestCustom } from "../interfaces/userInterfaces/userInterfaces";
import  {addDbUserHandler} from '../handlers'

const express = require("express");
const userRouter = new express.Router();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "POST"],
};


const userAuth = (req: RequestCustom, res: Response, next: NextFunction) => {
    next()
};

userRouter.use(userAuth);

userRouter.get("/home", cors(corsOptions), (req: any, res: any) => {
  res.send({ message: "hello" });
});

    
    
userRouter.post("/adduser",cors(corsOptions),addDbUserHandler, (req: any, res:any) => {
  res.send({message:"thanks"})
})

module.exports = userRouter;
