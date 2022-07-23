import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { IcognitoUser, user } from "../interfaces/userInterfaces";
const {getSessionTokenForWebuser} = require('../vonageApi/sessionId')
dotenv.config();

declare var process: {
  env: {
    MONGODBPASSWORD: string;
  };
};
const dbPassword = process.env.MONGODBPASSWORD;

console.log(dbPassword);

const uri =
  "mongodb+srv://warbotzadmin:" +
  dbPassword +
  "@cluster0.jy9lc.mongodb.net/rawBotz%20images?retryWrites=true&w=majority";

console.log(uri);

 const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri, {});

const attributes = {
  weapon: "laser",
  speed: 10,
  armour: 10,
  seats: 3,
};

const newObjectId =  new mongoDB.ObjectId(23456676)
const botCollection = client.db("botz").collection("botz");
const userCollection = client.db('users').collection('userProfile');

export const showlistofBotz = (callback:any)=>{

    client.connect((err)=>{
        botCollection.find().toArray((error,users)=>{
            callback(users)
        })

    })
}

export const updateBotSessionId=(botId:string,sessionId:string,callback:()=>void)=>{


    const filter={_id:botId}

    const updateDocument = {
      $set: {
        sessionId,
      }
   };

    botCollection.updateOne(filter,updateDocument,{},()=>{
      callback()
    })
  
}

export const getbotSessionId =(botId:number,callback:(sessionId:object)=>void)=>{
  const filter ={_id:botId}

  botCollection.findOne(filter,{}).then((bot)=>{

    if(bot!== null){
      getSessionTokenForWebuser(bot.sessionId,(token:string)=>{

          callback({
            token,
            sessionId:bot.sessionId
          })

      })
  
    }

  })
}

export const createBot =()=>{
  client.connect(()=>{
    botCollection.insertOne({
      _id: newObjectId,
      name: "newbot",
      password: "2323232323",
      location: "Berlin",
      attributes: attributes,
      img_src:"3232323",
      sessionId:"3232323"
    })
  })
}







/// userDatabase //////


export const createUser = (user:user,callback:()=>{}) =>{

  console.log(user)

  userCollection.insertOne({
    name: user.preferred_username,
    confirmedEmail: user.confirmedEmail,
    rank: 'Private',
    location: 'classified',
    sub: user.sub,
    profileImageSrc: '',
    userControls:[
      {control: 'up', keyCode: 'ArrowUp'},
      {control: 'down', keyCode: 'ArrowDown'},
      {control: 'right',keyCode: 'ArrowRight'},
      {control: 'left', keyCode: 'ArrowLeft'},
      {control: 'lights', keyCode: 'l'},
      {control: 'turretLeft', keyCode: 'a'},
      {control: 'turretRight', keyCode: 's'},
      {control: 'turretUp', keyCode: 'd'},
      {control: 'turretDown', keyCode: 'x'},
      {control: 'increaseDriveSpeed', keyCode: '+'},
      {control: 'decreaseDriveSpeed', keyCode: '-'},
      {control: 'increaseTurretSpeed', keyCode: '2'},
      {control: 'decreaseTurretSpeed', keyCode: '1'}
  ],

  },callback)

}
