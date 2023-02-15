import {db} from '../firebase';
import { Database } from 'firebase-admin/lib/database/database';
import { FirebaseGame } from '../interfaces/FirebaseData';

export class FirebaseAPiRequests  {

    

    constructor(){
        this.database=db
    }
    database:Database;


    public updateGame = (gameId:string,game:FirebaseGame) =>  {
        const ref = db.ref(`games/${gameId}`)
        return  ref.set(game)

    }



}


export const firebaseService = new FirebaseAPiRequests()