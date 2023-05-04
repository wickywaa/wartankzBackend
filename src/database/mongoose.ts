import { Schema, model, connect } from 'mongoose';
import {IGame, IUser} from '../interfaces';
import {gameSchema, userSchema} from './Schemas';
const uri =  (process.env.RUNMODE === "DEV" ?  process.env.MONGO_DB_DEV_URI : process.env.MONGO_DB_LIVE_URI) ?? '';
connect(`${uri}`);

export const User = model<IUser>('User', userSchema);
export const Game  = model<IGame>('Game', gameSchema);