import { Schema, model, connect } from 'mongoose';
import { IUser } from '../../interfaces';
import {userSchema} from '../Schemas/userSchemas';

export const User = model<IUser>('User', userSchema);
