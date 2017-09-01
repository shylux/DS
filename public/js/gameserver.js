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
        socket.emit('setup game', {rules: {}, player1: this.game.player1.name, player2: this.game.player2.name});
        for (let i = 0; i < this.game.gameLog.length; i++) {
            socket.emit('game action', this.game.gameLog[i]);
        }

        socket.on('game action', function(data) {
            console.log(data);

            try {
                let result = this.game.execute(data);

                if (result) {
                    for (let i = 0; i < this.players.length; i++) {
                        this.players[i].emit('game action', result);
                    }
                }
            } catch (err) {
                socket.emit('error', err);
            }

        }.bind(this));

        socket.on('disconnect', function(){
            console.log('user disconnected');
            this.players.splice(this.players.indexOf(socket), 1);
        }.bind(this));
    }
}

