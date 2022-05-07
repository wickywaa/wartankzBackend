import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
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

export const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri, {});

const attributes = {
  weapon: "laser",
  speed: 10,
  armour: 10,
  seats: 3,
};

const newObjectId =  new mongoDB.ObjectId(23456676)
const collection = client.db("botz").collection("botz");

export const showlistofBotz = (callback:any)=>{

    client.connect((err)=>{
        collection.find().toArray((error,users)=>{
            callback(users)
        })

    })
}

client.connect((err) => {
   const collection = client.db("botz").collection("botz");


  
/*   collection.insertOne({
    _id: newObjectId,
    name: "testbotz",
    image:
      "https://amplify-rawbotz-staging-180534-deployment.s3.us-east-2.amazonaws.com/neon+tank.jpg",
    password: "Daspaket1",
    location: "Berlin",
    attributes: attributes,
  }); */

  

  if(!err){

  }

  console.log("connected to database");
 
  // perform actions on the collection object
  //client.close();
});
