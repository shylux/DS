import Player from './player'
import Game from './game'

// server side
export default class GameServer {

    constructor() {
        this.players = [];
        this.game = new Game({}, new Player('Mew'), new Player('Mewtwo'));
    }

    connect(socket) {
        this.players.push(socket);

        // push game state
        for (let i = 0; i < this.game.gameLog.length; i++) {
            socket.emit('game action', this.game.gameLog[i]);
        }

        socket.on('game action', function(data) {
            console.log(data);

            let result = this.game.execute(data);
            if (result) {
                for (let i = 0; i < this.players.length; i++) {
                    this.players[i].emit('game action', result);
                }
            }
        }.bind(this));

        socket.on('disconnect', function(){
            console.log('user disconnected');
            this.players.splice(this.players.indexOf(socket), 1);
        }.bind(this));
    }
}

