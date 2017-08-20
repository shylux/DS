import GameServer from './public/js/gameserver'

// express
const express = require('express');
const app = express();
app.use(express.static('public'));

const server = app.listen(8080);

// io
const io = require('socket.io').listen(server);

var gameserver = new GameServer();

io.on('connection', function(socket){
    gameserver.connect(socket);
});