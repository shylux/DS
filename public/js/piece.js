const STRAIGHT_DIRECTIONS = [
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 0, y: -1}
];
const DIAGONAL_DIRECTIONS = [
    {x: 1, y: 1},
    {x: -1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: -1}
];
const ALL_DIRECTIONS = [
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 1, y: 1},
    {x: -1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: -1}
];
const MOVING_BEHAVIORS = {
    // default: stops at first piece with option to kill an enemy piece
    HITTING: 0,
    // stopping is like hitting but without the option to kill (pawn)
    STOPPING: 1
};

class Piece {
    constructor(owner, name) {
        this.owner = owner;
        this._name = name;
        this.hasMoved = false;
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

    *getMovesInDirection(game, x, y, direction, maxDistance = false, behaviour = MOVING_BEHAVIORS.HITTING) {
        let pos = {x: x, y: y};
        let distance = 0;

        while (true) {
            distance++;
            if (distance > maxDistance) break;

            pos.x += direction.x;
            pos.y += direction.y;
            try {
                let cell = game.getCell(pos.x, pos.y);
                if (!cell.tile.passable) break;

                if (cell.piece) {
                    if (behaviour !== MOVING_BEHAVIORS.STOPPING && cell.piece.owner !== this.owner)
                        yield {x: pos.x, y: pos.y};
                    break;
                }

                yield {x: pos.x, y: pos.y};
            } catch(err) {
                // break if OutsideOfBoard. else its an unexpected error
                if (err !== "OutsideOfBoard") throw err;
                break;
            }
        }
    }

    getOwnerDirection() {
        switch(this.owner.number) {
            case 1:
                return {x: 0, y: -1};
            case 2:
                return {x: 0, y: 1};
            default:
                throw 'UnknownOwnerDirection';
        }
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

    *getPossibleMoves(game, x, y) {

        // a pawn can move two spaces if it hasn't moved yet
        let distance = (this.hasMoved ? 1 : 2);

        // move in front
        yield* this.getMovesInDirection(game, x, y, this.getOwnerDirection(), distance, MOVING_BEHAVIORS.STOPPING);

        // diagonal moves - only available if the move can kill an opposing piece
        let hittingMoves = [
            {x: 1, y: this.getOwnerDirection().y},
            {x: -1, y: this.getOwnerDirection().y},
        ];
        for (let d = 0; d < hittingMoves.length; d++) {
            // move one field diagonal and check
            for (let move of this.getMovesInDirection(game, x, y, hittingMoves[d], 1)) {
                // check for opposing piece
                if (game.getCell(move).piece) yield move;
            }
        }

        // TODO: en passent - oder o eifach nid..
    }
}

export class God extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "God");
    }

    *getPossibleMoves(game, x, y) {
        for (let y = 0; y < game.board.length; y++) {
            for (let x = 0; x < game.board[y].length; x++) {
                yield {x: x, y: y};
            }
        }
    }

    get class() {
        return 'piece-god-' + super.class;
    }
}

export class Rook extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "Rook");
    }

    get class() {
        return 'piece-rook-' + super.class;
    }

    *getPossibleMoves(game, x, y) {

        for (let d = 0; d < STRAIGHT_DIRECTIONS.length; d++) {
            yield* this.getMovesInDirection(game, x, y, STRAIGHT_DIRECTIONS[d]);
        }
    }
}

export class Knight extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "Knight");
    }

    get class() {
        return 'piece-knight-' + super.class;
    }

    *getPossibleMoves(game, x, y) {
        let relativeMoves = [
            {x: 2, y: 1},
            {x: 2, y: -1},
            {x: -2, y: 1},
            {x: -2, y: -1},
            {x: 1, y: 2},
            {x: -1, y: 2},
            {x: 1, y: -2},
            {x: -1, y: -2},
        ];

        for (let d = 0; d < relativeMoves.length; d++) {
            yield* this.getMovesInDirection(game, x, y, relativeMoves[d], 1);
        }
    }
}

export class Bishop extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "Bishop");
    }

    get class() {
        return 'piece-bishop-' + super.class;
    }

    *getPossibleMoves(game, x, y) {
        for (let d = 0; d < DIAGONAL_DIRECTIONS.length; d++) {
            yield* this.getMovesInDirection(game, x, y, DIAGONAL_DIRECTIONS[d]);
        }
    }
}

export class Queen extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "Queen");
    }

    get class() {
        return 'piece-queen-' + super.class;
    }

    *getPossibleMoves(game, x, y) {
        for (let d = 0; d < ALL_DIRECTIONS.length; d++) {
            yield* this.getMovesInDirection(game, x, y, ALL_DIRECTIONS[d]);
        }
    }
}

export class King extends BlackWhiteChessPiece {
    constructor(owner) {
        super(owner, "King");
    }

    get class() {
        return 'piece-king-' + super.class;
    }

    *getPossibleMoves(game, x, y) {
        for (let d = 0; d < ALL_DIRECTIONS.length; d++) {
            yield* this.getMovesInDirection(game, x, y, ALL_DIRECTIONS[d], 1);
        }
    }
}