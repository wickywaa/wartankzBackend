import { Socket } from "socket.io";
require('dotenv').config()
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const {showlistofBotz}  = require("./database/mongodb")
const io = new Server(server);
const userRouter = require("./Routers/userRouter");
const botRouter= require("./Routers/botsRouter")




showlistofBotz((botz:any)=>{

console.log(botz)
})

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(botRouter)

interface userobject {
  Action: string;
  Username: string;
  UserId: string;
  email: string;
  socketId: string;
}

interface botObject{
  botName:string;
  botId:string;
  password:string;
  socketId:string;
}

interface messageObject {
  userName: string;
  message: string;
}
let users: userobject[] = [];
let bots: botObject[]=[];
let messages: messageObject[] = [];

const addUser = () => {};

const listofBotz =  

io.on("connection", (socket: Socket) => {
  //  works eith string
  //const map = [{"username":"vsf"},{"message":"sgs"}]

  const map = ["username","vsf"]
   const jsonmap = JSON.stringify(map)

   socket.emit('setControls',{
    up: false,
    down: true,
    right: true,
    left: false,
    turretUp: false,
    turretDown: false,
    turretLeft: false,
    turretRight: false,
    driveSpeed: 51,
    turretSpeed: 40,
    lights: false,
  }) 


  console.log('hello')
  socket.on("disconnect", () => {
    const newusers = users.filter((user) => {
      user.socketId !== socket.id;
    });
    socket.broadcast.emit("user_list", newusers);
  });

  socket.on('add user', (socket:Socket)=>{
    console.log(socket)

  })

  socket.on("registeruser", (user: userobject) => {
    console.log(user)
    const filteredusers = users.filter(
      (olduser) => user.email != olduser.email
    );
    users = [...filteredusers, user];
    console.log(users)
    io.sockets.emit("user_list", users);
    io.sockets.emit("bot_list",bots)

    // addUser(socket)
  });

  socket.on("registerBot",(bot :botObject)=>{
    console.log('the bot is connected',bot)
    const filteredBots = bots.filter((oldbot)=>bot.botId != oldbot.botId)
    bots = [...filteredBots,bot]
    console.log('here is the bots list,`',bots)
    io.sockets.emit("bot_list",bots)
  })

  socket.on("add_chat_message", (message: messageObject) => {
    messages.push(message);
    io.sockets.emit("messages_list", messages);
  });

  socket.on("send_bot_message",(message)=>{
    console.log('got here')
    const array  = [{"username":"wjdfh"},{}]
    const jsonmap = JSON.stringify(array)
    console.log(message)
    io.sockets.emit('login',{numUsers:34})
    io.sockets.emit('new message',{username:'gav',message:'here is the message'})
    //
    
    io.sockets.emit("setControls",{...message})
  })
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
