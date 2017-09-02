import LoseCondition from "./losecondition";
import {King} from "../../piece";

export default class KingDead extends LoseCondition {
    checkCondition(game) {
        let players = new Set([game.player1, game.player2]);
        for (let y = 0; y < game.board.length; y++) {
            for (let x = 0; x < game.board[y].length; x++) {
                if (game.board[y][x].piece instanceof King)
                    players.delete(game.board[y][x].piece.owner);
            }
        }
        return players;
    }
}