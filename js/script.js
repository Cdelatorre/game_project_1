document.addEventListener('DOMContentLoaded', function() {
  var game = new Game('main-canvas');
  $('#data-div').hide()
  $('#instructions').hide()
  $('#close-instructions').click(function(){
    $('#instructions').fadeOut();
  })
  
  $('#instructions-button').click(function(){
    $('#instructions').fadeIn()
  })
  $('#start-button').click(function() {
    game.start()
    $('.canvas-intro').hide()
    $('#data-div').fadeIn()
  });
});