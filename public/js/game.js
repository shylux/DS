import Cell from './cell'
import {God, Pawn, Rook, Knight, Bishop, Queen, King} from './piece'
import {WhiteTile, BlackTile} from './tile';
import KingDead from "./game_types/lose_conditions/kingdead";

export default class Game {
    constructor(rules, player1, player2) {
        this.rules = rules;
        // stores all moves of the game
        this.gameLog = [];
        // stores moves of players until every player has submitted
        this.currentMoveCache = [];
        this.player1 = player1;
        this.player1.number = 1;
        this.player2 = player2;
        this.player2.number = 2;
        this.playerCount = 2;

        this.board = this.generateCheckedBoard(8, 8);
        this.height = this.board.length;
        this.width = this.board[0].length;

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
        this.board[1][0].piece = new God(this.player2);
        this.board[6][7].piece = new God(this.player1);

        this.rules.loseConditions = [new KingDead()];

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
            playerNumber: sourceCell.piece.owner.number,
            movedPieceClass: sourceCell.piece.class,
            source: {x: sourceCell.x, y: sourceCell.y},
            target: {x: targetCell.x, y: targetCell.y},
            destroyed: false // this is set when two pieces collide
        };

        if (targetCell.piece)
            logEntry.killedPieceClass = targetCell.piece.class;

        return logEntry;
    }

    // checks if a move is valid
    checkMove(logEntry) {
        // check if the player already made his move
        for (let i = 0; i < this.currentMoveCache.length; i++)
            if (this.currentMoveCache[i].playerNumber === logEntry.playerNumber)
                throw 'OutOfSyncError: Player already made his move';

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
            this.currentMoveCache.push(logEntry);

            // wait for other players
            if (this.currentMoveCache.length < this.playerCount) {
                return {
                    action: 'notification',
                    type: 'PlayerMadeMove',
                    playerNumber: logEntry.playerNumber
                };
            }

            // build sym move
            let symLogEntry = {
                action: 'sym move',
                moves: this.currentMoveCache
            };

            // check and mark colliding piece
            for (let i = 0; i < symLogEntry.moves.length; i++) {
                for (let j = 0; j < symLogEntry.moves.length; j++) {
                    if (i !== j &&
                        symLogEntry.moves[i].target.x === symLogEntry.moves[j].target.x &&
                        symLogEntry.moves[i].target.y === symLogEntry.moves[j].target.y) {
                        // a collision!
                        symLogEntry.moves[i].destroyed = true;
                        break;
                    }
                }
            }

            this.currentMoveCache = [];
            this.execute(symLogEntry);
            console.log(symLogEntry);
            let gameEnd = this.checkWinCondition();
            if (gameEnd) {
                this.gameLog.push(gameEnd);
                return [symLogEntry, gameEnd];
            }
            return symLogEntry;
        }
        if (logEntry.action === 'sym move') {
            let pieces = [];

            // pick up pieces
            for (let i = 0; i < logEntry.moves.length; i++) {
                let sourceCell = this.getCell(logEntry.moves[i].source);
                pieces[i] = sourceCell.piece;
                delete sourceCell.piece;
            }

            // put piece down
            for (let j = 0; j < logEntry.moves.length; j++) {
                // do not put piece down if it was destroyed
                if (logEntry.moves[j].destroyed)
                    continue;

                let targetCell = this.getCell(logEntry.moves[j].target);
                targetCell.piece = pieces[j];
                targetCell.piece.hasMoved = true;
            }

            this.gameLog.push(logEntry);
        }
    }

    getPossibleMoves(cell) {
        return cell.piece.getPossibleMoves(this, cell.x, cell.y);
    }

    checkWinCondition() {
        let playersStillAlive = new Set([this.player1, this.player2]);
        for (let i = 0; i < this.rules.loseConditions.length; i++) {
            let losers = this.rules.loseConditions[i].checkCondition(this);
            for (let loser of losers.values()) {
                playersStillAlive.delete(loser);
            }
        }

        switch (playersStillAlive.size) {
            case 0:
                return {
                    action: 'gameEnd',
                    winner: 0 // number 0: draw
                };
            case 1:
                return {
                    action: 'gameEnd',
                    winner: [...playersStillAlive][0].number
                };
        }
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