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

    get classes() {
        let cls = this.tile.classes;
        if (this.piece) cls.push(this.piece.class);
        return cls;
    }

    render() {
        let template = require("../templates/cell.hbs");
        let params = {cell: this, classes: this.classes.join(' ')};
        return template(params);
    }
}