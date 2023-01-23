
import  firebaseAdmin from 'firebase-admin';

 const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS??'');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://rawbotz-46ddb-default-rtdb.europe-west1.firebasedatabase.app"
});

export const  db = firebaseAdmin.database();
export const  auth = firebaseAdmin.auth()

export const getBotSessionId = (botId:string,callback:(id:string)=>void):void=>{
  var ref =  db.ref(`bots/${botId}`);
  ref.once("value", function(snapshot) {
    if(!snapshot.val().sessionId){
      callback('')
    }
    callback(snapshot.val().sessionId)
  });
}