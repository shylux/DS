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