import { NextFunction,Response } from "express";
import { AuthService } from "../Services/Auth";
import {RequestCustom} from '../interfaces/userInterfaces';

const express = require("express");
const userRouter = new express.Router();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "POST"],
};

const authService = new AuthService();

const userAuth = (req:RequestCustom , res:Response , next: NextFunction) => {
  if (req.body.idToken && typeof req.body.idToken === 'string' && req.body.idToken.length > 0) {
    authService.isFirebaseUser(
      req.body.idToken,
      (response: { verified: boolean; uid: string }) => {
        if (response.verified === true) {
          next();
        } else {
          res.status(401).json({
            error: {
              message: " unauthorized",
            },
          });
          return
        }
      }
    );
  } else {
    console.log(req.body.idToken)
    res.status(400).json({
      error: {
        message: "id Token not recognized or not given",
      },
    });
    return;
  }
};

userRouter.use(userAuth);

userRouter.get("/home", cors(corsOptions), (req: any, res: any) => {
  res.send({ message: "hello" });
});

module.exports = userRouter;
