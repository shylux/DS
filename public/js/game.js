import Cell from './cell'
import {Pawn, Rook} from './piece'
import {WhiteTile, BlackTile} from './tile';

export default class Game {
    constructor(rules, player1, player2) {
        this.rules = rules;
        this.player1 = player1;
        this.player1.number = 1;
        this.player2 = player2;
        this.player2.number = 2;

        this.board = this.generateCheckedBoard(8, 8);

        this.board[0][0].piece = new Pawn(this.player2);
        this.board[5][5].piece = new Rook(this.player1);

        // save coords on cell for easier lookup
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                let cell = this.board[y][x];
                cell.x = x;
                cell.y = y;
            }
        }
    }

    move(sourceCell, targetCell) {
        if (!sourceCell.piece) throw 'NoPieceToMove';

        let logEntry = {
            action: 'move',
            movedPieceClass: sourceCell.piece.class,
            source: {x: sourceCell.x, y: sourceCell.y},
            target: {x: targetCell.x, y: targetCell.y},
        };

        if (targetCell.piece)
            logEntry.killedPiece = targetCell.piece;

        targetCell.piece = sourceCell.piece;
        delete sourceCell.piece;

        return logEntry;
    }

    getPossibleMoves(cell) {
        return cell.piece.getPossibleMoves(this, cell.x, cell.y);
    }

    getCell(x, y) {
        if (y < 0 || y >= this.board.length) throw "OutsideOfBoard";
        let row = this.board[y];
        if (x < 0 || x >= row.length) throw "OutsideOfBoard";
        return row[x];
    }

    render() {
        let template = require("../templates/board.hbs");
        return template({game: this});
    }

    generateCheckedBoard(width, height) {
        let board = [];
        for (let y = 0; y < height; y++) {
            board[y] = [];
            for (let x = 0; x < width; x++) {
                board[y][x] = new Cell(((x + y) % 2 === 0 ? new BlackTile() : new WhiteTile()));
            }
        }
        return board;
    }
}