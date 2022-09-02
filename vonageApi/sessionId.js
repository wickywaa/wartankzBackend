const OpenTok = require("opentok");
const dotenv  = require( "dotenv");
const {updateBotSessionId} = require('../database/mongodb');
dotenv.config();
const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_API_SECRET_KEY);


const createSessionId = (botId,callback)=>{

    opentok.createSession({}, (err, session)=> {
        if (err) return console.log(err);
        

            callback({
                sessionId:session.sessionId,
            })   

      })
     
    
};

const getSessionTokenForWebuser =(sessionId,endTime,callback)=>{

    const expireTime = new Date(endTime)
    

    console.log('end time ',endTime)
    console.log(expireTime.getTime())

   const token = opentok.generateToken(sessionId,{
        role: "subscriber",
        expireTime: endTime
        //data: "name=Johnny",
        //initialLayoutClassList: ["focus"],
      })

      callback(token)

    }



module.exports ={
    createSessionId,
    getSessionTokenForWebuser
}
