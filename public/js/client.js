import {readCookie, createCookie, eraseCookie} from './utils/cookie'
import GameMaster from './gamemaster'
import timeSince from "./utils/timeSince";

class Client {
    constructor(username) {
        this.login(username);
        this.socket = io();

        this.socket.on('setup game', function (data) {
            this.gamemaster = new GameMaster(this.socket, this, data);
        }.bind(this));

        this.socket.on('list games', function (data) {
            this.listGames(data);
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
        for (let game of data) {
            let template = require("../templates/gamepreview.hbs");
            let html = template({
                id: game.id,
                name: game.name,
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

