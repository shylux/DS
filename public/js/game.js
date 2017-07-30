export default class Game {
    constructor(rules, player1, player2) {
        this.rules = rules;
        this.player1 = player1;
        this.player2 = player2;
        this.board = [[1,0], [0,1]];
    }

    isFinished() {
        //TODO: check in rules
        return false;
    }
}