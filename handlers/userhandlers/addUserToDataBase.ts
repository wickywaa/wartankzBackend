import { NextFunction, Response } from "express";
import { AddUserToDataBaseRequest } from "../../interfaces/";
import { addUser } from '../../database/';

export const addDbUserHandler = (req: AddUserToDataBaseRequest, res: Response, next: NextFunction) => {
    
        addUser();

    console.log('jshfh')

  next();
};
