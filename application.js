$( document ).ready(function() {

// elementsShuffle();
// $('.btn').click(function(){
//   clearElements();
//   // elementShuffle();
// }









// INSERTING CARDS INTO ELEMENTS WRAPPER

var clearElements = function() {
  $( ".symbol" ).remove();
};

var elementShuffle = function(sliced) {
  clearElements();
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

var randomElement = function(array) {
  var randomNum = Math.floor(Math.random() * array.length);
  var randomElement = array[randomNum];
  var randomElementName = randomElement.name;
  var randomElementId = randomElement.id;
  $('.name-display').html(randomElementName);
  console.log(randomElementName + randomElementId)
};

$('.btn').click(function(){
  randomElement(sliced);
  shuffle(sliced);
  elementShuffle(sliced);
});


// JQUERY CLOSER
});
// JQUERY CLOSER
