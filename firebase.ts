
import  firebaseAdmin from 'firebase-admin';

var serviceAccount = "\"type\": \"service_account\",\r\n  \"project_id\": \"rawbotz-46ddb\",\r\n  \"private_key_id\": \"531a6cb7a8cf070b95b94de25a0d219a4c7d4e28\",\r\n  \"private_key\": `${process.env.FIREBASE_ADMIN_PRIVATE_KEY}`,\r\n  \"client_email\": `${process.env.FIREBASE_ADMIN_CLIENT_EMAIL}`,\r\n  \"client_id\": `${process.env.FIREBASE_ADMIN_CLIENT_KEY}`,\r\n  \"auth_uri\": \"https:\/\/accounts.google.com\/o\/oauth2\/auth\",\r\n  \"token_uri\": \"https:\/\/oauth2.googleapis.com\/token\",\r\n  \"auth_provider_x509_cert_url\": \"https:\/\/www.googleapis.com\/oauth2\/v1\/certs\",\r\n  \"client_x509_cert_url\":`${process.env.FIREBASE_ADMIN_CERT_URL}`,"


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


