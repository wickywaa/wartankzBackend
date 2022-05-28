const OpenTok = require("opentok");
const dotenv  = require( "dotenv");
const {updateBotSessionId} = require('../database/mongodb');
dotenv.config();
const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_API_SECRET_KEY);


const createSessionId = (botId,callback)=>{

    opentok.createSession({}, (err, session)=> {
        if (err) return console.log(err);
        const token  =  session.generateToken({
            role:"publisher",
        });

            callback({
                sessionId:session.sessionId,
                token
            })   

      })
     
    
};

const getSessionTokenForWebuser =(sessionId,callback)=>{

   const token = opentok.generateToken(sessionId,{
        role: "subscriber",
        //expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // in one week
        //data: "name=Johnny",
        //initialLayoutClassList: ["focus"],
      })

      callback(token)

    }



module.exports ={
    createSessionId,
    getSessionTokenForWebuser
}
