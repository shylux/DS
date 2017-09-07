import {God, Pawn, Rook, Knight, Bishop, Queen, King} from "../piece";

export let PIECE_REGISTRY = {};

export function register(piece) {
    PIECE_REGISTRY[piece.name] = piece;
}

register(God);
register(Pawn);
register(Rook);
register(Knight);
register(Bishop);
register(Queen);
register(King);