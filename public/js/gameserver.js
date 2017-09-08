import guid from "./utils/guid";
import {RULE_SETS} from "./game_types/rulesets";
import Player from "./player";
import Game from "./game";

// server side
export default class GameServer {

    constructor() {
        this.players = {};
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
        let sessionID = guid();
        this.players[sessionID] = {
            sessionID: sessionID,
            socket: socket
        };

        socket.emit('list games', {
            games: this.games,
            lobbys: this.lobbys
        });

        socket.on('login', function(username) {
            this.players[sessionID].username = username;
            console.log(username + ' logged in');
        }.bind(this));

        socket.on('create lobby', function(data) {
            data.id = guid();
            data.created = new Date();
            this.lobbys.push(data);
            socket.emit('reload');
        }.bind(this));

        socket.on('join game', function(id) {
            for (let lobby of this.lobbys) {
                if (lobby.id === id) {
                    this.lobbys.splice(this.lobbys.indexOf(lobby), 1);
                    let game = new Game(
                        RULE_SETS[lobby.ruleset],
                        lobby.name,
                        new Player(lobby.player),
                        new Player(this.players[sessionID].username),
                        true);
                    this.games.push(game);

                    this.openGame(sessionID, game);
                    break;
                }
            }
        }.bind(this));

        socket.on('open game', function(id) {
            for (let game of this.games) {
                if (game.id === id) {
                    this.openGame(sessionID, game);
                    break;
                }
            }
        }.bind(this));

        socket.on('game action', function(action) {
            console.log(action);
            let game = this.players[sessionID].game;

            try {
                let result = game.execute(action);

                if (result) {
                    this.distributeActions(game, result);
                }
            } catch (err) {
                console.log(err);
                socket.emit('error message', err);
            }

        }.bind(this));

        socket.on('disconnect', function(){
            console.log('user disconnected');
            delete this.players[sessionID];
        }.bind(this));
    }

    openGame(sessionID, game) {
        this.players[sessionID].game = game;
        let socket = this.players[sessionID].socket;
        socket.emit('setup game', game);

        for (let action of game.gameLog) {
            socket.emit('game action', action);
        }
    }

    distributeActions(game, actions, sessionID) {
        // no socket: distribute to every player in this game
        if (sessionID === undefined) {
            for (let sessionID of Object.keys(this.players)) {
                if (this.players[sessionID].game === game)
                    this.distributeActions(game, actions, sessionID);
            }
            return;
        }

        if (!Array.isArray(actions))
            actions = [actions];

        for (let action of actions) {
            this.players[sessionID].socket.emit('game action', action);
        }
    }
}

