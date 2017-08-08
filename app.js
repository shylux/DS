import GameServer from './public/js/gameserver'

// express
const express = require('express');
const app = express();
app.use(express.static('public'));

const server = app.listen(8080);

// io
const io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('a user connected');
    let gs = new GameServer().connect(socket);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});