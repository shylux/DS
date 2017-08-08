export default class Tile {
    constructor() {
        this.passable = true;
    }

    get classes() {
        throw "NotImplemented";
    }
}

export class BlackTile extends Tile {
    get classes() {
        return ["tile-black"];
    }
}

export class WhiteTile extends Tile {
    get classes() {
        return ["tile-white"];
    }
}