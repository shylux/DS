import guid from "./utils/guid";
import {RULE_SETS} from "./game_types/rulesets";
import Player from "./player";
import Game from "./game";

// server side
export default class GameServer {

    constructor() {
        this.players = [];
        this.games = [];
        this.lobbys = [{
            id: guid(),
            created: new Date(),
            ruleset: 'chess',
            name: 'Init Game',
            player: 'root'
        }];
    }

    connect(socket) {
        this.players.push(socket);

        socket.emit('list games', {
            games: this.games,
            lobbys: this.lobbys
        });

        socket.on('create lobby', function(data) {
            data.id = guid();
            data.created = new Date();
            this.lobbys.push(data);
            socket.emit('reload');
        }.bind(this));

        socket.on('join game', function(data) {
            for (let lobby of this.lobbys) {
                if (lobby.id === data.id) {
                    this.lobbys.splice(this.lobbys.indexOf(lobby), 1);
                    let game = new Game(
                        RULE_SETS[lobby.ruleset],
                        lobby.name,
                        new Player(lobby.player),
                        new Player(data.username));
                    this.games.push(game);
                    socket.emit('setup game', game);
                    break;
                }
            }
        }.bind(this));

        socket.on('open game', function(id) {
            for (let game of this.games) {
                if (game.id === id) {
                    socket.emit('setup game', game);
                    break;
                }
            }
        }.bind(this));

        // push game state
        // socket.emit('setup game', {rules: {}, player1: this.game.player1.name, player2: this.game.player2.name});
        // for (let i = 0; i < this.game.gameLog.length; i++) {
        //     socket.emit('game action', this.game.gameLog[i]);
        // }

        socket.on('game action', function(data) {
            console.log(data);

            try {
                let result = this.game.execute(data);

                if (result) {
                    this.distributeActions(result);
                }
            } catch (err) {
                console.log(err);
                socket.emit('error message', err);
            }

        }.bind(this));

        socket.on('disconnect', function(){
            console.log('user disconnected');
            this.players.splice(this.players.indexOf(socket), 1);
        }.bind(this));
    }

    distributeActions(actions, player) {
        // no player: distribute to every player
        if (player === undefined) {
            for (let i = 0; i < this.players.length; i++) {
                this.distributeActions(actions, this.players[i]);
            }
            return;
        }

        if (!Array.isArray(actions))
            actions = [actions];

        for (let i = 0; i < actions.length; i++) {
            player.emit('game action', actions[i]);
        }
    }
}

