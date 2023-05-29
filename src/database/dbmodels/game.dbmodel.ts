import { Schema, model, connect } from 'mongoose';
import { IUser, IGame } from '../../interfaces';
import { gameSchema } from '../Schemas';

export const Game  = model<IGame>('Game', gameSchema);