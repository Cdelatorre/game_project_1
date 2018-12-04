document.addEventListener('DOMContentLoaded', function() {
  var game = new Game('main-canvas')
  game.start()
  /* INTRO SLIDE */


  // $('#introduction').hide().delay(1000).fadeIn(2000);
  // setTimeout(function(){
  //   $('#introduction').fadeOut(1000);
  //   $('#blackdiv').show().delay(1000).fadeOut()
  // }, 6000)
 
  /* END OF INTRO SLIDE */

  /* MAIN MENU */

  // $("#start-game-div").hover(
  //   function() {
  //     $('#start-game').siblings('.swords-select').fadeIn( 100 );
  //   },function(){
  //     $('#start-game').siblings('.swords-select').fadeOut( 100 )
  //   }
  // );

  // $("#instructions-div").hover(
  //   function() {
  //     $('#game-instructions').siblings('.swords-select').fadeIn( 100 );
  //   },function(){
  //     $('#game-instructions').siblings('.swords-select').fadeOut( 100 )
  //   }
  // );

  // $('#data-div').hide()
  // $('#instructions').hide()
  // $('#close-instructions').click(function(){
  //   $('#instructions').fadeOut();
  // })
  
  // $('#game-instructions').click(function(){
  //   $('#instructions').fadeIn()
  // })
  // $('#start-game').click(function() {
  //   game.start()
  //   $('.canvas-intro').fadeOut(1000)
  //   $('#data-div').fadeIn()
  // });
});