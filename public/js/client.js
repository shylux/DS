import {readCookie, createCookie, eraseCookie} from './utils/cookie'
import GameMaster from './gamemaster'
import timeSince from "./utils/timeSince";
import {RULE_SETS} from "./game_types/rulesets";


class Client {
    constructor(username) {
        this.login(username);
        this.setupCreateGame();
        this.socket = io();
        this.socket.emit('login', this.username);

        this.socket.on('setup game', function (game) {
            this.gamemaster = new GameMaster(this.socket, this, game);
            $('body').addClass('ingame');
        }.bind(this));

        this.socket.on('list games', function (data) {
            this.listGames(data);
        }.bind(this));

        this.socket.on('reload', function() {
            location.reload();
        }.bind(this));
    }

    login(username) {
        this.username = username;
        let info = $('#user .info');
        $('.username', info).text(username);
        $('.logout', info).click(function() {
            eraseCookie('username');
            location.reload();
        }.bind(this));

        $('body').addClass('logged-in');
    }

    listGames(data) {
        $('#mygames, #lobbys, #spectategames').empty();

        // lobbys
        for (let lobby of data.lobbys) {
            let template = require("../templates/lobby.hbs");
            let html = template({
                id: lobby.id,
                name: lobby.name,
                ruleset: RULE_SETS[lobby.ruleset].name,
                player: lobby.player,
                created: timeSince(new Date(lobby.created)),
                joinable: (lobby.player !== this.username)
            });
            $('#lobbys').prepend(html);
        }
        $(document).on('click', '.lobby .join', function(e) {
            let id = $(e.target).parents('.lobby').data('id');
            this.socket.emit('join game', id);
        }.bind(this));

        // games
        for (let game of data.games) {
            let template = require("../templates/gamepreview.hbs");
            let html = template({
                id: game.id,
                name: game.name,
                ruleset: RULE_SETS[game.rules.id].name,
                player1: game.player1.name,
                player2: game.player2.name,
                created: timeSince(new Date(game.created))
            });

            if (game.player1.name === this.username || game.player2.name === this.username) {
                $('#mygames').prepend(html);
            } else {
                $('#spectategames').prepend(html);
            }
        }
        $(document).on('click', '#games .game', function(e) {
            let id = $(e.target).closest('.game').data('id');
            this.socket.emit('open game', id);
        }.bind(this));
    }

    setupCreateGame() {
        $('#gamename').attr('placeholder', this.defaultGameName());

        // fill chess variants
        for (let id of Object.keys(RULE_SETS)) {
            let ruleset = RULE_SETS[id];
            let template = require("../templates/ruleset-select.hbs");
            let html = template({
                id: ruleset.id,
                name: ruleset.name
            });
            $('#ruleset').append(html);
        }
        $('#ruleset input:first').prop('checked', true);

        $('#create-game').on('click', function() {
            $('#creator').slideToggle();
        });
        $('#creator').on('submit', this.createGame.bind(this));
    }

    defaultGameName() {
        return this.username + "'s Game";
    }

    createGame(event) {
        event.preventDefault();
        let name = $('#gamename').val();
        if (name.length === 0)
            name = this.defaultGameName();
        this.socket.emit('create lobby', {
           player: this.username,
           name: name,
           ruleset: $('input[name=ruleset]:checked').val()
        });
        $('#creator').slideToggle();
    }
}


let username = readCookie('username');
if (username !== null) {
    new Client(username);
}
$(document).on('submit', '#login', function(event) {
    event.preventDefault();
    let username = $('#login input.username').val();
    if (username !== '') {
        createCookie('username', username, 7);
        new Client(username);
    }
});

