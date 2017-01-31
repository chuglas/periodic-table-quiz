$( document ).ready(function() {



var clearElements = function() {
  $( ".symbol" ).remove();
};

// INSERTING CARDS INTO ELEMENTS WRAPPER
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


var grabElementId = function() {
  $('.symbol').click(function(){
    var elementId = this.id;
    console.log(this.id);
  });
};





// JQUERY CLOSER
});
// JQUERY CLOSER
