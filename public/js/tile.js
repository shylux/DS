export default class Tile {
    constructor() {
    }

    get classes() {
        throw "NotImplemented";
    }
}

export class BlackTile {
    get classes() {
        return ["tile-black"];
    }
}

export class WhiteTile {
    get classes() {
        return ["tile-white"];
    }
}