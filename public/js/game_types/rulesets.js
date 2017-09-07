import Game from '../game'
import KingDead from "./lose_conditions/kingdead";


export let RULE_SETS = {
    'chess': {
        id: 'chess',
        name: "Chess",
        loseConditions: [new KingDead()],
        boardWidth: 8,
        boardHeight: 8,
        setupMoves: function* () {
            for (let x = 0; x < 8; x++) {
                yield Game.preparePlacePiece(x, 1, 2, "Pawn");
                yield Game.preparePlacePiece(x, 6, 1, "Pawn");
            }
            yield Game.preparePlacePiece(0, 0, 2, "Rook");
            yield Game.preparePlacePiece(7, 0, 2, "Rook");
            yield Game.preparePlacePiece(0, 7, 1, "Rook");
            yield Game.preparePlacePiece(7, 7, 1, "Rook");
            yield Game.preparePlacePiece(1, 0, 2, "Knight");
            yield Game.preparePlacePiece(6, 0, 2, "Knight");
            yield Game.preparePlacePiece(1, 7, 1, "Knight");
            yield Game.preparePlacePiece(6, 7, 1, "Knight");
            yield Game.preparePlacePiece(2, 0, 2, "Bishop");
            yield Game.preparePlacePiece(5, 0, 2, "Bishop");
            yield Game.preparePlacePiece(2, 7, 1, "Bishop");
            yield Game.preparePlacePiece(5, 7, 1, "Bishop");
            yield Game.preparePlacePiece(4, 0, 2, "Queen");
            yield Game.preparePlacePiece(4, 7, 1, "Queen");
            yield Game.preparePlacePiece(3, 0, 2, "King");
            yield Game.preparePlacePiece(3, 7, 1, "King");
            yield Game.preparePlacePiece(0, 1, 2, "God");
            yield Game.preparePlacePiece(7, 6, 1, "God");
        }
    }
};