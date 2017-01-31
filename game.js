var Game = function() {
    this.player = '';
    this.endScore = 10;
    this.currentScore = 0;
};

// RANDOMIZE ARRAY of 20 ELEMENTS
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
  return array.slice(0,20);
}

// Chooses One Random Element for the Correct Answer
Game.prototype.randomElement = function(array) {
  var randomNum = Math.floor(Math.random() * array.length);
  var randomElement = array[randomNum];
  var randomElementName = randomElement.name;
  $('.name-display').html(randomElementName);
  var randomElementId = randomElement.id;
  $('.name-display').attr("id", randomElementId);
  return randomElementId;
};

//Clears Elements From Div Before Next Question
Game.prototype.clearElements = function() {
  $( ".symbol" ).remove();
};

// Appends the Element Divs onto the DOM
Game.prototype.elementShuffle = function() {
  this.clearElements();
  var sliced = shuffle(elements);
  this.randomElement(sliced);
  for (var i = 0; i < sliced.length; i++) {
    var elementSym = sliced[i].symbol;
    var elementId = sliced[i].id;
    var div = $("<div></div>");
    div.addClass("symbol");
    div.attr("id", elementId);
    div.html(elementSym);
    $('#symbol-container').append(div);
  }
};

Game.prototype.angerLevel = function() {
  var face = $('.st3');
  var eyes = $('.st5');
  var status = $('.status-bar');
  switch(this.currentScore) {
    case 0: face.css("fill", "#fbb040"); status.css("background-color", "#fbb040"); status.css("height", "10%"); break;
    case 1: face.css("fill", "#f99d33"); status.css("background-color", "#f99d33"); status.css("height", "20%"); break;
    case 2: face.css("fill", "#f68b28"); status.css("background-color", "#f68b28"); status.css("height", "30%"); break;
    case 3: face.css("fill", "#f47920"); status.css("background-color", "#f47920"); status.css("height", "40%"); break;
    case 4: face.css("fill", "#f26522"); status.css("background-color", "#f26522"); status.css("height", "50%"); break;
    case 5: face.css("fill", "#f04e23"); status.css("background-color", "#f04e23"); status.css("height", "60%"); break;
    case 6: face.css("fill", "#ed1c24"); status.css("background-color", "#ed1c24"); status.css("height", "70%"); break;
    case 7: face.css("fill", "#c4161c"); status.css("background-color", "#c4161c"); status.css("height", "80%"); break;
    case 8: face.css("fill", "#9e0b0f"); status.css("background-color", "#9e0b0f"); status.css("height", "90%"); eyes.css("fill", "#ec382c");break;
    case 9: face.css("fill", "#790000"); status.css("background-color", "#790000"); status.css("height", "100%"); break;
  }
};

Game.prototype.checkGuess = function() {
  var self = this;
  $('.symbol').click(function(){
    var guess = this.id;
    console.log(guess + " is the guess");
    var correct = $('.name-display').attr('id');
    console.log(correct + " is the right answer");
    if (guess === correct) {
      self.currentScore = self.currentScore + 1;
      console.log('correct guesses = ' + self.currentScore);
      self.angerLevel();
      newRound();
    }
    else {
      self.currentScore = self.currentScore - 1;
      if (self.currentScore < 0) {
        self.currentScore = 0;
      }
      self.angerLevel();
      console.log('correct guesses = ' + self.currentScore);
      newRound();
    }
  });
};

Game.prototype.timer = function() { setInterval(function() {
  for(i=0;i<this.maxSeconds;i++) {
    if (this.currentScore < this.endScore) {
      countdown.innerHTML = i;
      i++;
    }
    else if (this.currentScore === this.endScore) {
      countdown.innerHTML = i;
      clearInterval(intervalId);
    }
  }
}, 1000);
};
}


var newGame = new Game();

newGame.elementShuffle();
newGame.checkGuess();

var newRound = function() {
  newGame.elementShuffle();
  newGame.checkGuess();
  console.log("new round started");
  console.log("current score: " + newGame.currentScore );
};


//// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// onclick
// -- check guess
// -- check answer
// ---- if guess = answer
// ------ dom actions +
// ---- else
// ------ dom actions -
// -- reshuffle everything
// -- re-randomize array
// -- re-display divs