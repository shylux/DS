import Player from './player'
import Game from './game'
import {RULE_SETS} from './game_types/rulesets'
import {Queen, Rook, Bishop, Knight, Pawn} from "./piece";
import {PIECE_REGISTRY} from "./game_types/pieceregistry";

// client side
export default class GameMaster {
    constructor(socket, client, game) {
        // setup game based on 'setup game' data from server
        let player1 = new Player(game.player1.name);
        let player2 = new Player(game.player2.name);

        this.localPlayer = null;
        if (player1.name === client.username)
            this.localPlayer = player1;
        if (player2.name === client.username)
            this.localPlayer = player2;

        this.game = new Game(RULE_SETS[game.rules.id], game.name, player1, player2);
        this.render();
        this.html.css('width', this.game.width*64+"px");

        $('#board-wrapper').append(this.html);
        $('td', this.html).on('click', function(event) {
            this.handleClick(this.getCell($(event.target)));
        }.bind(this));

        $(document).on('click', '#pawn-promotion > div', function(event) {
            let target = $(event.target);
            let logEntry = this.promotionCache;
            logEntry.promotionPieceName = target.data('name');
            this.hideNotification();
            this.socket.emit('game action', logEntry);
        }.bind(this));

        this.socket = socket;
        this.socket.on('game action', function (data) {
            console.log(data);
            switch (data.action) {
                case 'action':
                case 'sym move':
                case 'place piece':
                case 'gameEnd':
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
        let targetJQCell = this.getjqCell(cell);
        if (targetJQCell.hasClass('possibleMove')) {
            let sourceJqCell = $('td.selected', this.html);
            let sourceCell = this.getCell(sourceJqCell);

            let logEntry = Game.prepareMove(sourceCell, cell);

            if (targetJQCell.hasClass('en-passant')) {
                logEntry.special = 'en-passant';
                // should always be a pawn
                logEntry.passantClass = this.game.getCell(cell.x, sourceCell.y).piece.class;
            }

            if (targetJQCell.hasClass('promote')) {
                logEntry.special = 'promote';
                this.promotionCache = logEntry;
                this.showPromotionPrompt();
                this.deselectPiece();
                return;
            }

            this.deselectPiece();

            this.socket.emit('game action', logEntry);

            return;
        }

        // show possible moves
        if (cell.piece && (cell.piece.owner === this.localPlayer || this.admin)) {
            if (targetJQCell.hasClass('selected')) {
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
            for (let move of logEntry.moves) {
                let sourceJqCell = this.getjqCell(move.source);
                sourceJqCell.removeClass(move.movedPieceClass);
            }

            // put pieces down
            for (let move of logEntry.moves) {
                if (move.destroyed)
                    continue;

                let targetJqCell = this.getjqCell(move.target);
                if (move.capturedPieceClass)
                    targetJqCell.removeClass(move.capturedPieceClass);
                targetJqCell.addClass(move.movedPieceClass);
            }

            // do special moves
            for (let smove of logEntry.moves) {
                if (smove.special === 'en-passant') {
                    this.getjqCell({x: smove.target.x, y: smove.source.y}).removeClass(smove.passantClass);
                }
                if (smove.special === 'promote') {
                    let targetJqCellFU = this.getjqCell(smove.target);
                    let player = this.game.getPlayer(smove.playerNumber);
                    targetJqCellFU.removeClass(new Pawn(player).class);
                    let pieceClass = PIECE_REGISTRY[smove.promotionPieceName];
                    targetJqCellFU.addClass(new pieceClass(player).class);
                }
            }
        }

        if (logEntry.action === 'gameEnd') {
            if (logEntry.winner === 0) {
                this.showNotification('Draw', 'The game ended in a draw.');

            } else if (logEntry.winner === this.localPlayer.number) {
                $('.message', this.html).addClass('win');
                this.showNotification('Winner', 'You won this game.');

            } else {
                $('.message', this.html).addClass('lose');
                this.showNotification('2nd Place', 'You lost this game');
            }
        }

        if (logEntry.action === 'place piece') {
            let jqCell = this.getjqCell(logEntry);
            let cell = this.getCell(jqCell);
            jqCell.addClass(cell.piece.class);
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
        for (let move of this.game.getPossibleMoves(cell)) {
            let jqcell = this.getjqCell(move);
            jqcell.addClass('possibleMove');
            if (move.special)
                jqcell.addClass(move.special);
        }
    }
    deselectPiece() {
        $('.selected', this.html).removeClass('selected');
        $('.possibleMove', this.html)
            .removeClass('possibleMove')
            .removeClass('en-passant')
            .removeClass('promote');
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

    showPromotionPrompt() {
        let template = require("../templates/promote.hbs");
        let html = template({pieces: [
            new Queen(this.localPlayer),
            new Rook(this.localPlayer),
            new Bishop(this.localPlayer),
            new Knight(this.localPlayer)
        ]});
        this.showNotification('Promote your pawn!', html);
    }

    render() {
        let template = require("../templates/board.hbs");
        let html = template({game: this.game, player: this.localPlayer});
        this.html = $(html);
    }
}