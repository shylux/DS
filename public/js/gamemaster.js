import Player from './player'
import Game from './game'

var player1 = new Player("Bisaflor");
var player2 = new Player("Mewtwo");
var game = new Game({}, player1, player2);

console.log(game.isFinished());

$('body').append(game.render());