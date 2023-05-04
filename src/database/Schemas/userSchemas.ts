import {Schema} from  'mongoose';
import  {IUser} from '../../interfaces';

export const userSchema = new Schema<IUser> ({
    name:{
        type:String,
        required:true,
    },
    confirmedEmail:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true
    },
    preferred_username:{
        type:String,
        required:true, 
    },
    location:{
        type:String,
        required:true,
    },
    rank:{
        type:String,
        required:true,
    },
    uid:{
        type:String,
        required:true
    }
});