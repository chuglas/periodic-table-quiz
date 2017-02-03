var playerOneScore = 0;
var playerTwoScore = 0;

var Game = function() {
    this.player = '';
    this.endScore = 10;
    this.currentScore = 0;
    this.finalTime = 0;
    this.chosenLanguage = '';
};

// RANDOMIZE AN ARRAY & CUT IT DOWN TO 20 ELEMENTS
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
  return array.slice(0,19);
}


// CHOOSES ONE RANDOM ELEMENT FOR THE CORRECT ANSWER
Game.prototype.randomElement = function(array) {
  var randomNum = Math.floor(Math.random() * array.length);
  var randomElement = array[randomNum];
  switch (this.chosenLanguage) {
    case 'Esp': $('.name-display').html(randomElement.espName); break;
    case 'Eng': $('.name-display').html(randomElement.name); break;
  }
  $('.name-display').attr("id", randomElement.id);
  return randomElement.id;
};


//CLEARS ELEMENTS FROM THE DIV BEFORE THE NEXT QUESTIO
Game.prototype.clearElements = function() {
  $( ".symbol" ).remove();
};


// APPENDS THE ELEMENT DIV SQUARES INTO THE DOM / GAME BOARD
Game.prototype.elementShuffle = function() {
  this.clearElements();
  var sliced = shuffle(elements);
  var fakeSliced = shuffle(fakeElements);
  sliced.push(fakeSliced[0]);
  shuffle(sliced);
  this.randomElement(sliced);
  for (var i = 0; i < sliced.length; i++) {
    var div = $("<div></div>");
    div.addClass("symbol");
    div.attr("id", sliced[i].id);
    div.html(sliced[i].symbol);
    $('#symbol-container').append(div);
  }
};


// ADJUSTS THE ANGER LEVEL
Game.prototype.angerLevel = function() {
  var face = $('.st3');
  var eyes = $('.st5');
  var status = $('.status-bar');
  switch(this.currentScore) {
    case 0: face.css("fill", "#fbb040"); status.css("background-color", "#fbb040"); status.css("height", "0%"); eyes.css("fill", "#58595B"); break;
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


//CHECKS THE GUESS & PULLS UP A NEW QUESTIO
Game.prototype.checkGuess = function() {
  //REMOVES THE BULLSHIT ALERT & APPENDS A NEW ONE SO THAT THE CSS ANIMATION CAN REPEAT
  $('.bullshit-alert').remove();
  $('aside').append('<div class="bullshit-alert"><h5>ALTERNATIVE FACT!</h5></div>');
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


//RECORDS THE RUNNING TIME & THE FINISHED TIME OF EACH PLAYER
Game.prototype.timer = function() {
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
                        self.player = ''; // CLEARS OUT PLAYER INFO SO THAT PLAYER 2 CAN START
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
  $('#player-one-recap-score').html(playerOneScore);
  $('.btn-close').click(function(){
    $('#modal--player-one-done').removeClass('active');
  });
};

Game.prototype.playerTwoRecap = function() {
  if (playerOneScore > playerTwoScore) {
    $('#winner-name').html("PLAYER TWO WINS!");
  }
  else {
    $('#winner-name').html("PLAYER ONE WINS!");
  }
  $('#modal--game-over').addClass('active');
  $('#btn-refresh').click(function(){
    location.reload();
  });
};


//PULLS UP A NEW QUESTIO
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
    self.currentScore = 3;
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


// CLICK EVENTS TO CREATE NEW GAMES ~ ~ ~ ~ ~ ~ ~ ~

$('#player-one-start').click(function(){
  $('.instructions-wrapper').remove();
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
  $('#player-two-mask').remove();
});
