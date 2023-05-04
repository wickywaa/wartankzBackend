import { NextFunction, Response } from "express";
import { AddUserToDataBaseRequest } from "../../interfaces/";
import  {User} from '../../database/mongoose';

export const addDbUserHandler = (req: AddUserToDataBaseRequest, res: Response, next: NextFunction) => {
    
       const newUser = new User({
          name:'Gav',
          email:'gavnewton27@gmail.com',
          confirmedEmail:'',
          preferred_username:'newUser',
          location:'Berlin',
          rank:'Private',
          uid:'1234',
        })

        newUser.save().then(()=>{
          return next();
        }).catch((error)=>{
          res.send({error:{
            message:`could not save user ${error}`
          }})
        })

};
