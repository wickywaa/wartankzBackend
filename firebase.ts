
import  firebaseAdmin from 'firebase-admin';

var serviceAccount = require('./rawbotz-46ddb-firebase-adminsdk-rt8de-531a6cb7a8.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://rawbotz-46ddb-default-rtdb.europe-west1.firebasedatabase.app"
});

const  db = firebaseAdmin.database();



export const getBotSessionId = (botId:string,callback:(id:string)=>void):void=>{
  var ref =  db.ref(`bots/${botId}`);
  ref.once("value", function(snapshot) {
    if(!snapshot.val().sessionId){
      callback('')
    }
    callback(snapshot.val().sessionId)
  });
}


