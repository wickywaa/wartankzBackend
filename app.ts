import { Socket } from "socket.io";
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET,POST"],
    allowedHeaders: ["my-custom-header"],
  },
});
const userRouter = require("./Routers/userRouter");

app.use(express.json());
app.use(cors());
app.use(userRouter);

interface userobject {
  Action: string;
  Username: string;
  UserId: string;
  email: string;
  socketId: string;
}
interface messageObject {
  userName: string;
  message: string;
}
let users: userobject[] =[];
let messages: messageObject[] = [];

const addUser = () => {};


io.on("connection", (socket: Socket) => {
  socket.on("disconnect", () => {
    const newusers = users.filter((user) => {
      user.socketId !== socket.id;
    });
    socket.broadcast.emit("user_list", newusers);
  });

  socket.on("registeruser", (user: userobject) => {
    const filteredusers = users.filter(
      (olduser) => user.email != olduser.email
    );
    users= filteredusers
    console.log("users", users);
    users =[...users,user] 
    io.sockets.emit("user_list", users);

    // addUser(socket)
  });

  socket.on("add_chat_message", (message: messageObject) => {
    messages.push(message);
    io.sockets.emit("messages_list", messages);
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
