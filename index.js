// Node server which will handle socket io connections
const io = require('socket.io')(8000);
const users = {};

const express = require("express");
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'home.html'));
  });
  
const port = 6000 ;
  app.listen(port, () => {
    console.log("Server running at port : " + port);
  });
  

io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{

        if(message!=''){
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
        }
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
