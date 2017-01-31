$( document ).ready(function() {


  var clearElements = function() {
    $( ".symbol" ).remove();
  };

  // INSERTING CARDS INTO ELEMENTS WRAPPER
  // var elementShuffle = function(sliced) {
  //   clearElements();
  //   for (var i = 0; i < sliced.length; i++) {
  //     var div = $("<div></div>");
  //     div.addClass("symbol");
  //     div.attr("id", sliced[i].id);
  //     div.html(sliced[i].symbol);
  //     $('#symbol-container').append(div);
  //   }
  // };

  var removePlayerOneButton = function() {
    $('#player-one-start').remove();
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
