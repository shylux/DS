module.exports = function(game, player, array, block) {
    let reversed = (game.player2 === player);

    let accum = '';
    for(let i = 0; i < array.length; ++i) {
        let ri = reversed ? array.length - (i+1) : i;
        accum += block.fn(array[ri]);
    }
    return accum;
};