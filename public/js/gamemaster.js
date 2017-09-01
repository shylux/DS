import Player from './player'
import Game from './game'

// client side
export default class GameMaster {
    constructor(socket, client, data) {
        // setup game based on 'setup game' data from server

        let player1 = new Player(data.player1);
        let player2 = new Player(data.player2);

        this.localPlayer = null;
        if (player1.name === client.username)
            this.localPlayer = player1;
        if (player2.name === client.username)
            this.localPlayer = player2;

        this.game = new Game({}, player1, player2);
        this.render();

        $('#board-wrapper').append(this.html);
        $('td', this.html).on('click', function(event) {
            this.handleClick(this.getCell($(event.target)));
        }.bind(this));

        this.socket = socket;
        this.socket.on('game action', function (data) {
            console.log(data);
            switch (data.action) {
                case 'action':
                case 'sym move':
                    this.hideNotification();
                    this.game.execute(data);
                    this.executeAction(data);
                    break;
                case 'notification':
                    switch (data.type) {
                        case 'PlayerMadeMove':
                            if (data.playerNumber === this.localPlayer.number)
                                this.showNotification('Please wait...', 'Waiting for other player to make his move.');
                            break;
                        default:
                            this.showError('UnknownNotificationType: '+data.type);
                    }
                    break;
                default:
                    this.showError('UnknownGameAction: '+data.action);
            }
        }.bind(this));

        this.socket.on('error message', function (data) {
            this.showError(data);
        }.bind(this));
    }

    handleClick(cell) {
        // execute move
        if (this.getjqCell(cell).hasClass('possibleMove')) {
            let sourceJqCell = $('td.selected', this.html);
            let sourceCell = this.getCell(sourceJqCell);

            let logEntry = this.game.prepareMove(sourceCell, cell);

            this.deselectPiece();

            this.socket.emit('game action', logEntry);

            return;
        }

        // show possible moves
        if (cell.piece && (cell.piece.owner === this.localPlayer || this.admin)) {
            if (this.getjqCell(cell).hasClass('selected')) {
                // a click on a selected piece deselects it
                this.deselectPiece();
            } else {
                // selected his own piece
                this.selectPiece(cell);
            }
        }
    }

    executeAction(logEntry) {
        if (logEntry.action === 'sym move') {
            // pick up pieces
            for (let i = 0; i < logEntry.moves.length; i++) {
                let sourceJqCell = this.getjqCell(logEntry.moves[i].source);
                sourceJqCell.removeClass(logEntry.moves[i].movedPieceClass);
            }

            // put pieces down
            for (let i = 0; i < logEntry.moves.length; i++) {
                if (logEntry.moves[i].destroyed)
                    continue;

                let targetJqCell = this.getjqCell(logEntry.moves[i].target);
                if (logEntry.moves[i].killedPieceClass)
                    targetJqCell.removeClass(logEntry.moves[i].killedPieceClass);
                targetJqCell.addClass(logEntry.moves[i].movedPieceClass);
            }
        }
    }

    getCell(jqcell) {
        let x = jqcell.data('x');
        let y = jqcell.data('y');
        return this.game.board[y][x];
    }

    getjqCell(cell) {
        return $('td[data-x="'+cell.x+'"][data-y="'+cell.y+'"]', this.html);
    }

    selectPiece(cell) {
        $('.selected', this.html).removeClass('selected');
        this.getjqCell(cell).addClass('selected');

        $('.possibleMove', this.html).removeClass('possibleMove');
        let possibleMoves = this.game.getPossibleMoves(cell);
        for (let i = 0; i < possibleMoves.length; i++) {
            let move = possibleMoves[i];
            let jqcell = this.getjqCell(move);
            jqcell.addClass('possibleMove');
        }
    }
    deselectPiece() {
        $('.selected', this.html).removeClass('selected');
        $('.possibleMove', this.html).removeClass('possibleMove');
    }

    showNotification(title, content) {
        $('.message .title', this.html).text(title);
        $('.message .content', this.html).html(content);
        $('.overlay', this.html).show();
    }
    showError(message) {
        $('.message', this.html).addClass('error');
        this.showNotification(
            'Error: ' + message,
            'Try to <a href=".">reload</a>. ' +
            'If that doesn\'t work yell at the dev: <a href="mailto:shylux@gmail.com">shylux@gmail.com</a>');
    }
    hideNotification() {
        $('.overlay', this.html).hide();
    }

    render() {
        let template = require("../templates/board.hbs");
        let html = template({game: this.game, player: this.localPlayer});
        this.html = $(html);
    }
}