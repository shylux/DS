import Player from './player'
import Game from './game'

const GAME_STATES = {
    // waiting for the user to make a play
    INPUT: 1,
    // waiting on other players - input is blocked
    WAITING: 2
};

// client side
class Gamemaster {
    constructor() {
        this.gameState = GAME_STATES.INPUT;
        this.admin = true; // admin can move both pieces
        this.localPlayer = new Player("Bisaflor");
        let player2 = new Player("Mewtwo");

        this.game = new Game({}, this.localPlayer, player2);
        this.html = $(this.game.render());

        $('#board-wrapper').append(this.html);
        $('td', this.html).on('click', function() {
            gm.handleClick(gm.getCell($(this)));
        });

        this.socket = io();
        this.socket.on('game action', function (data) {
            console.log(data);
            switch (data.action) {
                case 'action':
                case 'sym move':
                    this.game.execute(data);
                    this.executeAction(data);
                    break;
                case 'notification':
                    switch (data.type) {
                        case 'PlayerMadeMove':
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
}

var gm = new Gamemaster();