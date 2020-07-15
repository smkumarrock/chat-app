const express = require('express')
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/chatapp";

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('join', function(data) {
        socket.join(data.room);
        console.log('the', data.name ,'has joined to ', data.room);
        socket.broadcast.to(data.room).emit(data.message, 'new user');
    });
    socket.on('message', function(data) {
        console.log(data);
        io.in(data.room).emit('new message', {room: data.room, message: data.message, name: data.name});
    });
    socket.on('login', function(data){
        console.log(data.name);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("chatapp");
            var roomNo = Math.floor(100000 + Math.random() * 900000);
            var myobj = { name: data.name, password: data.pswd, room: roomNo };
            dbo.collection("chatusers").insertOne(myobj, function(err, res) {
              if (err) throw err;
              io.emit('loginres', roomNo);
              console.log("1 document inserted");
              db.close();
            });
          });
    });;
    socket.on('userList', function(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("chatapp");
            dbo.collection("chatusers").find({}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              db.close();
              io.emit('getUser', result);
            });
          });
    })
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
io.on('disconnect', () => {
    console.log('user disconnected');
});