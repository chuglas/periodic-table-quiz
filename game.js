var playerOneScore = 0;
var playerTwoScore = 0;

var Game = function() {
    this.player = '';
    this.endScore = 3;
    this.currentScore = 0;
    this.maxTime = 1000;
    this.finalTime = 0;
    this.chosenLanguage = '';
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


// CHOOSES ONE RANDOM ELEMENT FOR THE CORRECT ANSWER
Game.prototype.randomElement = function(array) {
  var randomNum = Math.floor(Math.random() * array.length);
  var randomElement = array[randomNum];
  if (this.chosenLanguage === 'Esp') {
    $('.name-display').html(randomElement.espName);
  }
  if (this.chosenLanguage === 'Eng') {
    $('.name-display').html(randomElement.name);
  }
  $('.name-display').attr("id", randomElement.id);
  return randomElement.id;
};


//CLEARS ELEMENTS FROM THE DIV BEFORE THE NEXT QUESTIO
Game.prototype.clearElements = function() {
  $( ".symbol" ).remove();
};


// APPENDS THE ELEMENT DIVS INTO THE DOM
Game.prototype.elementShuffle = function() {
  this.clearElements();
  var sliced = shuffle(elements);
  this.randomElement(sliced);
  for (var i = 0; i < sliced.length; i++) {
    var div = $("<div></div>");
    div.addClass("symbol");
    div.attr("id", sliced[i].id);
    div.html(sliced[i].symbol);
    $('#symbol-container').append(div);
  }
};


// CHANGES ANGER LEVEL
Game.prototype.angerLevel = function() {
  var face = $('.st3');
  var eyes = $('.st5');
  var status = $('.status-bar');
  switch(this.currentScore) {
    case 0: face.css("fill", "#fbb040"); status.css("background-color", "#fbb040"); status.css("height", "0%"); break;
    case 1: face.css("fill", "#fbb040"); status.css("background-color", "#fbb040"); status.css("height", "10%"); break;
    case 2: face.css("fill", "#f99d33"); status.css("background-color", "#f99d33"); status.css("height", "20%"); break;
    case 3: face.css("fill", "#f68b28"); status.css("background-color", "#f68b28"); status.css("height", "30%"); break;
    case 4: face.css("fill", "#f47920"); status.css("background-color", "#f47920"); status.css("height", "40%"); break;
    case 5: face.css("fill", "#f26522"); status.css("background-color", "#f26522"); status.css("height", "50%"); break;
    case 6: face.css("fill", "#f04e23"); status.css("background-color", "#f04e23"); status.css("height", "60%"); break;
    case 7: face.css("fill", "#ed1c24"); status.css("background-color", "#ed1c24"); status.css("height", "70%"); break;
    case 8: face.css("fill", "#c4161c"); status.css("background-color", "#c4161c"); status.css("height", "80%"); break;
    case 9: face.css("fill", "#9e0b0f"); status.css("background-color", "#9e0b0f"); status.css("height", "90%"); eyes.css("fill", "#ec382c");break;
    case 10: face.css("fill", "#790000"); status.css("background-color", "#790000"); status.css("height", "100%"); break;
  }
};


//CHECKS THE GUESS & PULLS UP A NEW QUESTIOn
Game.prototype.checkGuess = function() {
  var self = this;
  $('.symbol').click(function(){
    var guess = this.id;
    var correct = $('.name-display').attr('id');
    if (guess === correct) {
      self.currentScore = self.currentScore + 1;
      self.newRound();
      if (this.innerHTML === 'Bs') {
        $('.bullshit-alert').addClass('active');
      }
      if (self.currentScore === self.endScore) {
        // endPlayer1();
      }
    }
    else {
      self.currentScore = self.currentScore - 1;
      if (self.currentScore < 0) {
        self.currentScore = 0;
      }
      self.newRound();
    }
  });
};


//RECORDS TEH TIME & THE FINISHED TIME
Game.prototype.timer = function() {
  // THIS IS BREAKING THE COUNTER
  // if (this.chosenLanguage === 'Esp') {
  //   this.currentScore = 1;
  //   this.angerLevel();
  // }
  var self = this;
  var count = 1;
  var countUp = setInterval(function() {
    if (self.currentScore < self.endScore) {
      switch(self.player) {
        case 'player1': $('#counter-1').html(count); break;
        case 'player2': $('#counter-1').html(playerOneScore); $('#counter-2').html(count); break;
      }
    }
    if (self.currentScore >= self.endScore) {
      self.finalTime = count;
      switch(self.player) {
        case 'player1': $('#counter-1').html(self.finalTime);
                        playerOneScore = self.finalTime;
                        clearInterval(countUp);
                        self.player = '';
                        self.playerOneRecap();
                        break;
        case 'player2': $('#counter-2').html(self.finalTime);
                        playerTwoScore = self.finalTime;
                        clearInterval(countUp);
                        self.playerTwoRecap();
                        break;
      }
    }
    count++;
  }, 1000);
};

Game.prototype.playerOneRecap = function() {
  console.log("Player One's Score is " + playerOneScore);
  $('#modal--player-one-done').addClass('active');
  $('.btn-close').click(function(){
    $('#modal--player-one-done').removeClass('active');
    console.log("this working?");
  });
};

Game.prototype.playerTwoRecap = function() {
  console.log("Player One's Score is " + playerOneScore);
  console.log("Player Two's Score is " + playerTwoScore);

  if (playerOneScore > playerTwoScore) {
    $('#winner-name').html("Player Two Wins");
  }
  else {
    $('#winner-name').html("Player one Wins");
  }
  $('#modal--game-over').addClass('active');

  $('#btn-refresh').click(function(){
    location.reload();
  });


};



//PULLS UP A NEW QUESTIOn
Game.prototype.newRound = function() {
  this.angerLevel();
  this.elementShuffle();
  this.checkGuess();
  console.log("current score: " + this.currentScore );
};


// LANGUAGE SELECT
Game.prototype.languageSelect = function() {
  var self = this;
  $('#modal--language').addClass('active');
  $('#spanish-select').click(function(){
    $('#modal--language').removeClass('active');
    self.chosenLanguage = 'Esp';
    self.currentScore = 1;
    self.angerLevel();
    self.startFirstRound();
  });
  $('#english-select').click(function(){
    $('#modal--language').removeClass('active');
    self.chosenLanguage = 'Eng';
    self.startFirstRound();
  });
};


// STARTS FIRST ROUND -- SHUFFLE, START TIMER, CHECK FIRST GUESS,
Game.prototype.startFirstRound = function() {
  this.elementShuffle();
  this.timer();
  this.checkGuess();
};



$('#player-one-start').click(function(){
  var newGame = new Game();
  newGame.player = 'player1';
  newGame.languageSelect();
  $('#player-one-start').remove();
});

$('#player-two-start').click(function(){
  var newGame2 = new Game();
  newGame2.angerLevel();
  newGame2.player = 'player2';
  console.log(newGame2.player);
  newGame2.languageSelect();
  $('#player-two-start').remove();
});
