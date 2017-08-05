import Player from './player'
import Game from './game'

class Gamemaster {
    constructor() {
        this.localPlayer = new Player("Bisaflor");
        let player2 = new Player("Mewtwo");

        this.game = new Game({}, this.localPlayer, player2);

        $('body').append(this.game.render());
        $('#board td').on('click', function() {
            gm.handleClick(gm.getCell($(this)));
        });
    }

    handleClick(cell) {
        this.select(cell);
    }

    getCell(jqcell) {
        let x = jqcell.data('x');
        let y = jqcell.data('y');
        return this.game.board[y][x];
    }
    getjqCell(cell) {
        return $('#board td[data-x="'+cell.x+'"][data-y="'+cell.y+'"]');
    }

    select(cell) {
        $('#board .selected').removeClass('selected');
        this.getjqCell(cell).addClass('selected');
    }
}

var gm = new Gamemaster();