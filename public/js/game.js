import Cell from './cell'
import {Pawn, Rook, Knight, Bishop, Queen, King} from './piece'
import {WhiteTile, BlackTile} from './tile';

export default class Game {
    constructor(rules, player1, player2) {
        this.rules = rules;
        this.gameLog = [];
        this.player1 = player1;
        this.player1.number = 1;
        this.player2 = player2;
        this.player2.number = 2;

        this.board = this.generateCheckedBoard(8, 8);

        for (let x = 0; x < 8; x++) {
            this.board[1][x].piece = new Pawn(this.player2);
            this.board[6][x].piece = new Pawn(this.player1);
        }
        this.board[0][0].piece = new Rook(this.player2);
        this.board[0][7].piece = new Rook(this.player2);
        this.board[7][0].piece = new Rook(this.player1);
        this.board[7][7].piece = new Rook(this.player1);
        this.board[0][1].piece = new Knight(this.player2);
        this.board[0][6].piece = new Knight(this.player2);
        this.board[7][1].piece = new Knight(this.player1);
        this.board[7][6].piece = new Knight(this.player1);
        this.board[0][2].piece = new Bishop(this.player2);
        this.board[0][5].piece = new Bishop(this.player2);
        this.board[7][2].piece = new Bishop(this.player1);
        this.board[7][5].piece = new Bishop(this.player1);
        this.board[0][4].piece = new Queen(this.player2);
        this.board[7][4].piece = new Queen(this.player1);
        this.board[0][3].piece = new King(this.player2);
        this.board[7][3].piece = new King(this.player1);

        // save coords on cell for easier lookup
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                let cell = this.board[y][x];
                cell.x = x;
                cell.y = y;
            }
        }
    }

    // generates a logEntry for a move
    // this logEntry can then be executed by all players
    prepareMove(sourceCell, targetCell) {
        if (!sourceCell.piece) throw 'NoPieceToMove';

        let logEntry = {
            action: 'move',
            movedPieceClass: sourceCell.piece.class,
            source: {x: sourceCell.x, y: sourceCell.y},
            target: {x: targetCell.x, y: targetCell.y},
        };

        if (targetCell.piece)
            logEntry.killedPieceClass = targetCell.piece.class;

        return logEntry;
    }

    // checks if a move is valid
    // TODO: check with piece class
    checkMove(logEntry) {
        let sourceCell = this.getCell(logEntry.source);
        let targetCell = this.getCell(logEntry.target);
        if (!sourceCell.piece) throw 'NoPieceToMove';
        if (sourceCell.piece.class !== logEntry.movedPieceClass) throw 'OutOfSyncError: wrong source piece class';
        if (logEntry.killedPieceClass &&
            logEntry.killedPieceClass !== targetCell.piece.class) throw 'OutOfSyncError: wrong killed piece class';
    }

    execute(logEntry) {
        if (logEntry.action === 'move') {
            this.checkMove(logEntry);

            let sourceCell = this.getCell(logEntry.source);
            let targetCell = this.getCell(logEntry.target);
            targetCell.piece = sourceCell.piece;
            delete sourceCell.piece;
        }

        this.gameLog.push(logEntry);
    }

    getPossibleMoves(cell) {
        return cell.piece.getPossibleMoves(this, cell.x, cell.y);
    }

    getCell(x, y) {
        // pass only the x param to be handled as object: {x: 1, y: 1}
        if (y === undefined) {
            y = x.y;
            x = x.x;
        }

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