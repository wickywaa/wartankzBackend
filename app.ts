import { Socket } from "socket.io";
require('dotenv').config()
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const {showlistofBotz}  = require("./database/mongodb")
const io = new Server(server, {
   cors: {
    origin: ["http://localhost:3000" ,"http://192.168.0.127"],
    methods: ["GET,POST"],
    allowedHeaders: ["my-custom-header"],
  }, 
});
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
  socket.on("disconnect", () => {
    const newusers = users.filter((user) => {
      user.socketId !== socket.id;
    });
    socket.broadcast.emit("user_list", newusers);
  });

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
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
