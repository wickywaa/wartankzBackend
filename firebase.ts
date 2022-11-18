
import  firebaseAdmin from 'firebase-admin';

var serviceAccount = {
  "type": "service_account",
  "project_id": "rawbotz-46ddb",
  "private_key_id": "531a6cb7a8cf070b95b94de25a0d219a4c7d4e28",
  "private_key": `${process.env.FIREBASE_ADMIN_PRIVATE_KEY}`,
  "client_email": `${process.env.FIREBASE_ADMIN_CLIENT_EMAIL}`,
  "client_id": `${process.env.FIREBASE_ADMIN_CLIENT_KEY}`,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url":`${process.env.FIREBASE_ADMIN_CERT_URL}`,
}


require('./rawbotz-46ddb-firebase-adminsdk-rt8de-531a6cb7a8.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.stringify(serviceAccount)),
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


