export default class Cell {
    constructor(tile, piece) {
        this._tile = tile;
        this.piece = piece;
        this.x = -1;
        this.y = -1;
    }

    hasPiece() {
        return this.piece !== undefined;
    }

    get tile() {
        return this._tile;
    }

    get classes() {
        let cls = this.tile.classes;
        if (this.hasPiece()) cls = cls.concat(this.piece.classes);
        return cls;
    }

    render() {
        let template = require("../templates/cell.hbs");
        let params = {cell: this, classes: this.classes.join(' ')};
        if (this.hasPiece()) {
            params.image = this.piece.image();
        }
        return template(params);
    }
}