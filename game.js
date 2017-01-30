var Game = function() {
    this.player = '';
};


// RANDOMIZE ARRAY of ELEMENTS

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


shuffle(elements);
var sliced = elements.slice(0,20);

//
Game.prototype.randomElements = function() {
  for(i=0;i<sliced.length;i++) {
    // console.log(sliced[i].name);
  }
};

var newGame = new Game();

newGame.randomElements();
