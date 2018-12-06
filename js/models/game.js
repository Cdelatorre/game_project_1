function Game(canvasId) {
  this.canvas = document.getElementById(canvasId)
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;
  this.ctx = this.canvas.getContext('2d');
  this.mouseX;
  this.mouseY;

  this.round = [];
  
  this.initRound1();

  this.round1State = 0;
  this.round2State = 0;
  this.round3State = 0;
  this.round4State = 0;

  this.noHitTime = false;

  this.hits = 0;
  this.randomX =  this.rand(100, CANVAS_WIDTH - 150);
  this.randomY =  this.rand(100, CANVAS_HEIGHT - 300)

  this.drawIntervalCount = 0;
  this.potionState = 0;

  this.pointer = new Pointer(this.ctx, this.mouseX, this.mouseY);
  this.arena = new Arena(this.ctx);
  this.castle = new Castle(this.ctx);
  this.player = new Player(this.ctx, 350, 250);
  this.potion = new Potion(this.ctx, 200, 200)
  this.potions = [];
  this.supers = [];


  document.addEventListener('keydown', this.onKeyEvent.bind(this));
  document.addEventListener('keyup', this.onKeyEvent.bind(this));
  document.addEventListener('mousemove', this.mouseMove.bind(this));
  document.addEventListener('mousedown', this.mouseDown.bind(this));

}

Game.prototype.rand = function (a, b) {
  return Math.floor(Math.random() * b + a);
}

/*-----Init Rounds --- */

Game.prototype.initRound = function(quantity, enemyType){
   for (var i = 0; i < quantity; i++) {
    var e = new enemyType(this.ctx, this.rand(0, CANVAS_WIDTH), this.rand(0, CANVAS_HEIGHT), (CANVAS_WIDTH - 50) / 2 );
    this.round.push(e) }; 
}

/* ----- Round 1 -----*/

Game.prototype.initRound1 = function () {
  this.initRound(20 ,Bat )
  

};

Game.prototype.round1IsOver = function(){
  if (this.round.length === 0 && this.round1State === 0 && this.round2State === 0){
      this.round1State = 1;
      return true }}

/* ------ Round 2  ------*/

Game.prototype.initRound2 = function () {
  this.initRound(10, Shooter);
  this.round2State = 1;
  $('#waves img:nth-child(2)').fadeIn(2000).animate({zoom: 1.3}, 100).fadeOut()
}

Game.prototype.round2IsOver = function(){
  if (this.round.length === 0 && this.round1State === 1 && this.round2State === 1){
    this.round2State = 2;
     return true 
    }
  }

/* ------ Round 3  ------*/

Game.prototype.initRound3 = function () {
  this.initRound(1, Giant);
  this.round3State = 1
  $('#waves img:nth-child(3)').fadeIn(2000).animate({zoom: 1.3}, 100).fadeOut()
}

Game.prototype.round3IsOver = function(){
  if (this.round.length === 0 && this.round1State === 1 && this.round2State === 2  && this.round3State === 1 ){
    this.round3State = 2; return true }}

// /*----- Round 4 ------*/

Game.prototype.initRound4 = function () {
  this.initRound(1, Bat)
  this.round4State = 1 
  $('#waves img:nth-child(4)').fadeIn(2000).animate({zoom: 1.3}, 100).fadeOut()
}

Game.prototype.round4IsOver = function(){
  if (this.round.length === 0 && this.round3State === 2  && this.round4State === 1 ){
    this.round4State = 2; return true }}

/*----- INTERACTIONS WITH ENEMIES ------*/


Game.prototype.deleteEnemies = function(){
  var newEnemyArray = this.round.filter(function(enemy) {
      return enemy.hit > 0;
  });
  var newBulletArray = this.player.fires.filter(function(bullet){
    return bullet.hit < 1;
  })
  
  this.player.fires = newBulletArray;
  this.round = newEnemyArray;
}

Game.prototype.addItem = function () {
  var random = this.rand(0, 20)
  this.round.forEach(enemy => {
    if (enemy.hit === 0 && random === 0) {
      var potion = new Potion(this.ctx, enemy.x, enemy.y)
      this.potions = this.potions.concat(potion);
      setTimeout(function () {
        var index = this.potions.indexOf(potion);
        this.potions.splice(index, 1);
      }.bind(this), 5000);
    } else if (enemy.hit === 0 && random === 1) {
      var superPower = new DobleSword(this.ctx, enemy.x, enemy.y)
      this.supers = this.supers.concat(superPower);
      setTimeout(function () {
        var index = this.supers.indexOf(superPower);
        this.supers.splice(index, 1);
      }.bind(this), 5000);
    }
  })
}

Game.prototype.hitChanges =  function(strength){
  this.player.hits += strength;
  if(score > 0){
    score -= 50
  }

  $('#hit').css("width", this.player.hits + '%');
  $('#heart-life').addClass('heart-hit')
  this.noHitTime = true;

  setTimeout(function(){
    $('#heart-life').removeClass('heart-hit')
    this.noHitTime = false;
  }.bind(this), 4000)
}

Game.prototype.addLive =  function(live){
  this.player.hits -= live;
  this.player.currentHits = this.player.hits;
  $('#hit').css("width", this.player.hits + '%');
}

/* ------ COLLISIONS ------- */

Game.prototype.enemyHit = function () { 
  return this.round.some(function (enemy) {
    return this.player.fires.some(function (fire) {
      return fire.collideWith(enemy);
    }.bind(this))
  }.bind(this));
}

Game.prototype.playerHitContact = function () {
  return this.round.some(function(enemy) {
    return this.player.collideWith(enemy);
  }.bind(this));
}

Game.prototype.playerHitShoot = function () {
  return this.round.some(function(enemy) {
    return enemy.fires.some(function(fire) {
      return fire.collideWith(this.player);
    }.bind(this));
  }.bind(this));
}

Game.prototype.playerGetPotion = function () {
  var itemCollision = this.potions.find(function(item) {
     return item.collideWith(this.player);
  }.bind(this))
  if (itemCollision) {
    var index = this.potions.indexOf(itemCollision);
    this.potions.splice(index, 1);
  }
  return itemCollision;
};

Game.prototype.playerGetSword = function () {
  var itemCollision = this.supers.find(function(item) {
     return item.collideWith(this.player);
  }.bind(this))
  if (itemCollision) {
    var index = this.supers.indexOf(itemCollision);
    this.supers.splice(index, 1);
  }
  return itemCollision;
};

Game.prototype.getMousePos = function (evt) {   
  var rect = this.canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
};

/* ----- EVENTS FUNCTIONS  ----- */

Game.prototype.mouseDown = function () {
  this.player.fire();
}

Game.prototype.mouseMove = function (evt) {   
  var mousePos = this.getMousePos(evt);
  this.mouseX = mousePos.x;
  this.mouseY = mousePos.y;
};

Game.prototype.onKeyEvent = function (event) {
  this.player.onKeyEvent(event);
};

/* ------- DRAW ------- */

Game.prototype.draw = function () {
  this.drawIntervalCount ++
  $('#score-count').text(score)

  this.arena.draw()
  this.pointer.draw (this.mouseX, this.mouseY);

  this.player.draw();
  this.player.update(this.mouseX, this.mouseY);

  this.addItem()
  this.deleteEnemies();
  this.enemyHit()

  if (this.playerHitShoot() && !this.noHitTime){  
    this.hitChanges(15)
  }

  if(this.playerGetPotion() && this.player.hits > 0){
    this.addLive(5)
  }

  if(this.playerGetSword()){
  
    this.player.super = true;
    setTimeout(function(){
      
    this.player.super = false;
    }.bind(this), 10000)
  }

  if (this.playerHitContact() && !this.noHitTime) {  
    this.hitChanges(5)
  }

  for (var i = 0; i < this.round.length; i++) {
    this.round[i].draw();
    this.round[i].update(this.player.x, this.player.y)
  }

  for (var i = 0; i < this.potions.length; i++) {
    this.potions[i].draw();
  }

  for (var i = 0; i < this.supers.length; i++) {
    this.supers[i].draw();
  }


  if(this.round1IsOver()){
    setTimeout(function(){
      this.initRound2();
      this.player.fires = [];
    }.bind(this), 1500)}

  if(this.round2IsOver()){ 
    setTimeout(function(){ 
      this.initRound3(); 
      this.player.fires = [];
    }.bind(this), 1500)}

  if(this.round3IsOver()){
    setTimeout(function(){ 
      this.initRound4(); 
      this.player.fires = [];
    }.bind(this), 1500)}

 
  if(this.player.hits === 100){
    SPEED_MOVE = 0;
    SPEED_MOVE   = 0;
  }

  // if(this.round4IsOver()){
  //   alert('gameover')
  //  }

  this.castle.draw()
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.start = function () {
  this.player.fires = [];
  setInterval(function () {
    this.clear();
    this.draw();
  }.bind(this), 1000 / 60)
};
