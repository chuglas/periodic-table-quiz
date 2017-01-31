var Game = function() {
    this.player = '';
    this.endScore = 20;
};


Game.prototype.guess = function(){

};

Game.prototype.answer = function(array){
  var score = 0;
  var randomNum = Math.floor(Math.random() * array.length);
  var randomElement = array[randomNum];
  var randomElementName = randomElement.name;
  var randomElementId = randomElement.id;
  console.log(randomElementId);
};

Game.prototype.scoreChecker = function(){
  if (this.guess() === this.answer()) {
    this.score ++;
  }
  else {
    this.score --;
  }
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

// Shuffle all the elements
shuffle(elements);

// Returns The Shuffled Elements Into a Group of Only 20
var sliced = elements.slice(0,20);

var newGame = new Game();
