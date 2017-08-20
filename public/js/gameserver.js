import Player from './player'
import Game from './game'

export default class GameServer {

    constructor() {
        this.players = [];
        this.game = new Game({}, new Player('Mew'), new Player('Mewtwo'));
    }

    connect(socket) {
        this.players.push(socket);

        socket.on('make move', function(data) {
            console.log(data);

            let sourceCell = this.game.board[data.source.y][data.source.x];
            this.game.move(sourceCell, data.target);
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i] === socket) continue;
                this.players[i].emit('make move', data);
            }
        }.bind(this));

        socket.on('disconnect', function(){
            console.log('user disconnected');
            this.players.splice(this.players.indexOf(socket), 1);
        }.bind(this));
    }
}

