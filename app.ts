import { Socket } from "socket.io";
import {
  userobject,
  botObject,
  messageObject,
} from "./interfaces/userInterfaces";
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { showlistofBotz } = require("./database/mongodb");
export const io = new Server(server,{
  cors:{
    origin:['http://localhost:3000','https://riotbotz.com','91.64.183.66'],
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
});
const userRouter = require("./Routers/userRouter");
const botRouter = require("./Routers/botsRouter");
const gameRouter = require("./Routers/gameRouter");

import { AuthService } from "./Services/Auth";
import { getBotSessionId } from "./firebase";

const { getSessionTokenForWebuser } = require("./vonageApi/sessionId");
const authService = new AuthService();
const PORT =  8080;

showlistofBotz((botz: any) => {});

let users: userobject[] = [];
let bots: botObject[] = [];
let messages: messageObject[] = [];

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(botRouter);
app.use(gameRouter)

const passwordCheck = () => {
  return true;
};
export const addUser = () => {
  console.log("hello");
};


io.on("connection", (socket: Socket) => {
  socket.on("disconnect", () => {

    const BotLeaving = bots.find((bot)=> bot.socketId ===  socket.id)
    const newusers = users.filter((user) => {
      return user.socketId !== socket.id;
    });

    const newBots = bots.filter((bot) => {
      return bot.socketId !== socket.id;
    });

    users = newusers;
    bots = newBots;
    socket.broadcast.emit("user_list", users);
    socket.broadcast.emit("bot_list", bots);
    console.log(bots)
  });

  socket.on("add user", (socket: Socket) => {});

  socket.on("registeruser", (user: userobject) => {
    const filteredusers = users.filter(
      (olduser) => user.email != olduser.email
    );
    users = [...filteredusers, user];
    io.sockets.emit("user_list", users);
    io.sockets.emit("bot_list", bots);
  });

  socket.on("registerBot", (Id: string, password: string) => {
    
    if (!passwordCheck()) {
      return;
    }
    const newBot: botObject = {
      botId: Id,
      socketId: socket.id,
    };
    const filteredBots = bots.filter((oldbot) => newBot.botId !== oldbot.botId);

    bots = [...filteredBots, newBot];
    io.sockets.emit("bot_list", bots);
    const endTime = new Date().getTime() + 864000000;
    getBotSessionId(Id, (sessionId) => {
      if (sessionId.length < 1) {
        return;
      }
      startGame(Id, endTime, sessionId);
    });
  });

  socket.on("add_chat_message", (message: messageObject) => {
    messages.push(message);
    io.sockets.emit("messages_list", messages);
  });

  socket.on("send_bot_message", (message) => {

    const selectedBot = bots.find((bot) => {
      return bot.botId === message.botId;
    });

    io.sockets.emit("login", { numUsers: 34 });
    io.sockets.emit("new message", {
      username: "gav",
      message: "here is the message",
    });
    io.sockets.to(selectedBot?.socketId).emit("setControls", message.controls);
  });
});

export const startGame = (
  botId: string,
  endTime: number,
  sessionId: string
) => {
  const selectedBot = bots.find((bot) => {
    return bot.botId === botId;
  });
  getSessionTokenForWebuser(
    "publisher",
    sessionId,
    endTime,
    (token: string) => {
      io.sockets.to(selectedBot?.socketId).emit("startGame", {
        sessionId,
        token,
      });
    }
  );
};

server.listen(PORT, () => {
  console.log(`listening on port, ${PORT}`);
});
