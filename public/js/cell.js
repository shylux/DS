export default class Cell {
    constructor(tile, piece) {
        this._tile = tile;
        this.piece = piece;
        this.x = -1;
        this.y = -1;
    }

    get tile() {
        return this._tile;
    }

    render() {
        let template = require("../templates/cell.hbs");
        let params = {
            cell: this,
            tileClass: this.tile.classes,
            piece: this.piece
        };
        return template(params);
    }
}