export default class Cell {
    constructor(tile, piece) {
        this._tile = tile;
        this.piece = piece;
    }

    get hasPiece() {
        return this.piece !== undefined;
    }

    get tile() {
        return this._tile;
    }

    get classes() {
        let cls = this.tile.classes;
        if (this.hasPiece) cls = cls.concat(this.piece.classes);
        return cls;
    }
}