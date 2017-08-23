import Player from './player'
import Game from './game'

class Gamemaster {
    constructor() {
        this.admin = true; // admin can move both pieces
        this.localPlayer = new Player("Bisaflor");
        let player2 = new Player("Mewtwo");

        this.game = new Game({}, this.localPlayer, player2);

        $('body').append(this.game.render());
        $('#board td').on('click', function() {
            gm.handleClick(gm.getCell($(this)));
        });

        this.socket = io();
        this.socket.on('make move', function (data) {
            console.log(data);
            this.game.execute(data);
            this.executeAction(data);
        }.bind(this))
    }

    handleClick(cell) {
        // execute move
        if (this.getjqCell(cell).hasClass('possibleMove')) {
            let sourceJqCell = $('#board td.selected');
            let sourceCell = this.getCell(sourceJqCell);

            let logEntry = this.game.prepareMove(sourceCell, cell);

            this.game.execute(logEntry);
            this.executeAction(logEntry);
            this.deselectPiece();

            this.socket.emit('make move', logEntry);

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
        if (logEntry.action === 'move') {
            let sourceJqCell = this.getjqCell(logEntry.source);
            let targetJqCell = this.getjqCell(logEntry.target);

            sourceJqCell.removeClass(logEntry.movedPieceClass);
            if (logEntry.killedPieceClass)
                targetJqCell.removeClass(logEntry.killedPieceClass);
            targetJqCell.addClass(logEntry.movedPieceClass);
        }
    }

    getCell(jqcell) {
        let x = jqcell.data('x');
        let y = jqcell.data('y');
        return this.game.board[y][x];
    }

    getjqCell(cell) {
        return $('#board td[data-x="'+cell.x+'"][data-y="'+cell.y+'"]');
    }

    selectPiece(cell) {
        $('#board .selected').removeClass('selected');
        this.getjqCell(cell).addClass('selected');

        $('#board .possibleMove').removeClass('possibleMove');
        let possibleMoves = this.game.getPossibleMoves(cell);
        for (let i = 0; i < possibleMoves.length; i++) {
            let move = possibleMoves[i];
            let jqcell = this.getjqCell(move);
            jqcell.addClass('possibleMove');
        }
    }
    deselectPiece() {
        $('#board .selected').removeClass('selected');
        $('#board .possibleMove').removeClass('possibleMove');
    }
}

var gm = new Gamemaster();