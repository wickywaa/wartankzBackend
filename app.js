var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var Server = require("socket.io").Server;
var io = new Server(server);
var userRouter = require('./Routers/userRouter');
app.use((req,res,next)=>{

    next()

})
app.use(express.json());
app.use(userRouter);
var users = [];
var addUser = function () {
};
var checkIfUserinArray = function (email) {
    var user = users.filter(function (user) {
        user.email === email;
        return true;
    });
    if (user)
        return true;
};
io.on('connection', function (socket) {
    console.log('user connected')
    socket.on('disconnect', function () {
    });
    socket.on('registeruser', function (user) {
        checkIfUserinArray(user.email);
        // addUser(socket)
    });
});

io.on('add user',()=>{
    console.log('logging in')
})
server.listen(8080, function () {
    console.log('listening on *:8000');
});
