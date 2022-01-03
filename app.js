const express  = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET,POST"],
        allowedHeaders: ["my-custom-header"],
    }
});
const userRouter = require('./Routers/userRouter');

app.use(express.json())
app.use(userRouter)

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })

    socket.on('join-room-home',(user)=>{
        console.log(user)
        console.log(socket.id)
       // addUser(socket)
    })


  });




server.listen(8080, () => {
    console.log('listening on *:3000');
  });



