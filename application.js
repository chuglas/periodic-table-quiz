$( document ).ready(function() {


  var clearElements = function() {
    $( ".symbol" ).remove();
  };

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
