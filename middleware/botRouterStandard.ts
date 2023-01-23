import { NextFunction,Request,Response } from "express";
import { AuthService } from "../Services/Auth";
import  {ParamsDictionary} from  "express-serve-static-core"
import  { RequestCustom} from '../interfaces/userInterfaces'
const authService = new AuthService()


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
      res.status(400).json({
        error: {
          message: "id Token not recognized or not given",
        },
      });
      return;
    }
  };