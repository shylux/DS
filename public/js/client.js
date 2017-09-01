import {readCookie, createCookie, eraseCookie} from './utils/cookie'
import GameMaster from './gamemaster'

class Client {
    constructor(username) {
        this.login(username);
        this.socket = io();

        this.socket.on('setup game', function (data) {
            this.gamemaster = new GameMaster(this.socket, this, data);
        }.bind(this));
    }

    login(username) {
        this.username = username;
        $('#login').hide();
        let info = $('#user .info');
        $('.username', info).text(username);
        $('.logout', info).click(function() {
            eraseCookie('username');
            location.reload();
        }.bind(this));
        info.show();
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

