import GameServer from './public/js/gameserver'

// express
const express = require('express');
const app = express();
app.use(express.static('public'));

const server = app.listen(3344);

// io
const io = require('socket.io').listen(server);

let gameserver = new GameServer();

io.on('connection', function(socket){
    gameserver.connect(socket);
});