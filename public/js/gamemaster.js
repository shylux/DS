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
    }

    handleClick(cell) {
        // execute move
        if (this.getjqCell(cell).hasClass('possibleMove')) {
            let sourceJqCell = $('#board td.selected');
            let sourceCell = this.getCell(sourceJqCell);
            let targetJqCell = this.getjqCell(cell);
            let pieceClass = sourceCell.piece.class;

            let logEntry = this.game.move(sourceCell, cell);
            sourceJqCell.removeClass(pieceClass);
            if (logEntry.killedPiece)
                targetJqCell.removeClass(logEntry.killedPiece.class);
            targetJqCell.addClass(pieceClass);
            this.deselectPiece();
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

var socket = io();