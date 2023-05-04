import { NextFunction,Request,Response } from "express";
import { AuthService } from "../Services/Auth";
import  { RequestBotId} from '../interfaces/userInterfaces'
const authService = new AuthService()


const userAuth = (req:RequestBotId , res:Response , next: NextFunction) => {

    next()
}


