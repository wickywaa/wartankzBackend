import { Schema } from "mongoose";
import { IGame } from "../../interfaces";

export const gameSchema = new Schema<IGame>({
  gameType: {
    type: String,
    required: true,
  },
  map:{
    type:String,
    required: true,
  },
  numberOfPlayers:{
    type:Number,
    require:true,
  },
  playersArray:{
    type:[],
    required:true,
  },
  duration:{
    type:Number,
    required:true,
  },
  gameStartDate:{
    type:Date,
    required:true,
  },
  gameEndDate:{
    type:Date,
    required:true,
  },
  startTime:{
    type:Number,
    required:true,
  },
  endTime:{
    type:Number,
    required:true,
  },
  credits:{
    type:Number,
    required:true
  }

});
