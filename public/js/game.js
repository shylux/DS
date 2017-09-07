import Cell from './cell'
import {WhiteTile, BlackTile} from './tile'
import guid from './utils/guid'
import {PIECE_REGISTRY} from "./game_types/pieceregistry";

export default class Game {
    constructor(rules, name, player1, player2, isServer) {
        this.id = guid();
        this.name = name;
        this.rules = rules;
        this.created = new Date();
        // stores all moves of the game
        this.gameLog = [];
        // stores moves of players until every player has submitted
        this.currentMoveCache = [];
        this.player1 = player1;
        this.player1.number = 1;
        this.player2 = player2;
        this.player2.number = 2;
        this.playerCount = 2;

        this.board = this.generateCheckedBoard(rules.boardWidth, rules.boardHeight);
        this.height = rules.boardHeight;
        this.width = rules.boardWidth;

        // save coords on cell for easier lookup
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                let cell = this.board[y][x];
                cell.x = x;
                cell.y = y;
            }
        }

        // only do the moves on the server and then push them onto the client
        if (isServer)
            for (let logEntry of rules.setupMoves()) {
                this.execute(logEntry);
            }
    }

    // generates a logEntry for a move
    // this logEntry can then be executed by all players
    static prepareMove(sourceCell, targetCell) {
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

    static preparePlacePiece(x, y, playerNumber, pieceName) {
        let logEntry = {
            action: 'place piece',
            pieceName: pieceName,
            playerNumber: playerNumber,
            x: x,
            y: y
        };
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

        if (logEntry.action === 'place piece') {
            let pieceClass = PIECE_REGISTRY[logEntry.pieceName];
            let player = this.getPlayer(logEntry.playerNumber);
            let piece = new pieceClass(player);
            let cell = this.getCell(logEntry);
            cell.piece = piece;
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

    getPlayer(playerNumber) {
        if (playerNumber === 1)
            return this.player1;
        if (playerNumber === 2)
            return this.player2;
        throw "InvalidPlayerNumber";
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