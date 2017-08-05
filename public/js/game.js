import Cell from './cell'
import {Pawn} from './piece'
import {WhiteTile, BlackTile} from './tile';

export default class Game {
    constructor(rules, player1, player2) {
        this.rules = rules;
        this.player1 = player1;
        this.player1.number = 1;
        this.player2 = player2;
        this.player2.number = 2;
        this.board = [
            [
                new Cell(new WhiteTile(), new Pawn(this.player1)),
                new Cell(new BlackTile())
            ],
            [
                new Cell(new BlackTile()),
                new Cell(new WhiteTile(), new Pawn(this.player2))
            ]
        ];
        // save coords on cell for easier lookup
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                let cell = this.board[y][x];
                cell.x = x;
                cell.y = y;
            }
        }
    }

    isFinished() {
        //TODO: check in rules
        return false;
    }

    render() {
        let template = require("../templates/board.hbs");
        return template({game: this});
    }
}