export default class Piece {
    constructor(owner, name) {
        this.owner = owner;
        this._name = name;
    }

    get name() {
        return this._name;
    }

    getPossibleMoves(game, x, y) {
        throw "NotImplemented"
    }

    get class() {
        throw "NotImplemented";
    }

    getMovesInDirection(game, x, y, direction) {
        let pos = {x: x, y: y};
        let moves = [];

        while (true) {
            pos.x += direction.x;
            pos.y += direction.y;
            try {
                let cell = game.getCell(pos.x, pos.y);
                if (!cell.tile.passable) break;

                if (cell.piece) {
                    if (cell.piece.owner !== this.owner)
                        moves.push({x: pos.x, y: pos.y});
                    break;
                }

                moves.push({x: pos.x, y: pos.y});
            } catch(err) {
                if (err !== "OutsideOfBoard") throw err;
                break;
            }
        }
        return moves;
    }
}

class BlackWhiteChessPiece extends Piece {
    constructor(owner, name, filename) {
        super(owner, name);
        this.filename = filename;
    }

    get class() {
        if (this.owner.number === 1) return "white";
        if (this.owner.number === 2) return "black";
        throw "InvalidOwnerNumber";
    }
}

export class Pawn extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "Pawn");
    }

    get class() {
        return 'piece-pawn-' + super.class;
    }

    getPossibleMoves(game, x, y) {
        let relativeMoves = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ];
        let moves = [];

        relativeMoves.forEach(function (move) {
            try {
                let cell = game.getCell(x + move.x, y + move.y);
                if (cell.tile.passable) moves.push({x: x + move.x, y: y + move.y});
            } catch(err) {
                if (err !== "OutsideOfBoard") throw err;
            }
        });
        return moves;
    }
}

export class Rook extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "Rook");
    }

    get class() {
        return 'piece-rook-' + super.class;
    }

    getPossibleMoves(game, x, y) {
        let directions = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ];
        let moves = [];

        for (let d = 0; d < directions.length; d++) {
            let direction = directions[d];
            Array.prototype.push.apply(moves, this.getMovesInDirection(game, x, y, direction));
        }

        return moves;
    }
}