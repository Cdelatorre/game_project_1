function Player(ctx, x, y) {
  this.ctx = ctx;
  this.angle;
  this.color = "blue"

  this.fires = []; // new
  this.fireOn = true; // new

  this.hits = 0;
  this.currentHits = this.hits;

  this.vx = 0;
  this.vy = 0;

  this.dy;
  this.dx;
 
  this.super = false;

  this.img = new Image();
  this.img.src = "./images/sheet_player_shield.png";
  this.img.frames = 2;
  this.img.frameIndex = 1;
  this.img.rows = 10;
  this.currentIndex = 1;
  this.cutY = 0;

  this.drawCount = 0;

  this.ctx = ctx

  this.width = 35;
  this.height = 35;
  this.x = x - 25;
  this.y = y;

  this.movements = {
    up: false,
    down: false,
    right: false,
    left: false
  }
}

Player.prototype.animate = function() {
  if (this.movements.up && this.y > 80) {
    this.vy = -SPEED_MOVE;
    this.cutY = 1;
  } else if (this.movements.down && this.y < CANVAS_HEIGHT - 137) {
    this.vy = SPEED_MOVE;
    this.cutY = 0;
  } else {
    this.vy *= FRICTION;
  }

  if (this.movements.right && this.x < CANVAS_WIDTH - this.width * 2) {
    this.vx = SPEED_MOVE;
    this.cutY = 3;
  } else if (this.movements.left && this.x > this.width) {
    this.vx = -SPEED_MOVE;
    this.cutY = 2;
  } else {
    this.vx *= FRICTION;
  }

  if (this.movements.up && this.movements.left){
    this.cutY = 6;
  
 } else if (this.movements.up && this.movements.right){
    this.cutY = 7;
 } else if (this.movements.down && this.movements.right){
    this.cutY = 4;
 } else if (this.movements.down && this.movements.left){
    this.cutY = 5;
 }

 if(this.currentHits < this.hits){
  this.cutY = 8;
   setTimeout(function(){
    this.cutY = 0;
    this.currentHits = this.hits;
   }.bind(this), 400)
 }

 if(this.currentHits >= 100){
   this.cutY = 9;
 }
  this.x += this.vx;
  this.y += this.vy;
}

Player.prototype.update = function(mouseX, mouseY) {
  this.dx = mouseX - this.x;
  this.dy = mouseY - this.y;
  this.angle = Math.atan2(this.dy, this.dx); // new
}

Player.prototype.onKeyEvent = function(event) {
  var state = event.type === 'keydown' ? true : false;
  switch (event.keyCode) {
    case KEY_UP:
      this.movements.up = state;
      break;
    case KEY_DOWN:
      this.movements.down = state;
      break;
    case KEY_LEFT:
      this.movements.left = state;
      break;
    case KEY_RIGHT:
      this.movements.right = state;
      break;
  }
}

Player.prototype.fire = function() {
  if(this.fireOn){
    var dx = Math.cos(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
    var dy = Math.sin(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
    var f = new Fire(this.ctx, this.angle, this.x, this.y, dx, dy);
    this.fires.push(f);
    this.fireOn = false;
    this.reload();
    return true;
  }
}


Player.prototype.reload = function(){
  setTimeout(function(){
    this.fireOn = true;
  }.bind(this), 350);
  console.log(this.fires)
}



Player.prototype.collideWith = function(enemy) {
  return this.x < enemy.x + enemy.width &&
    this.x + this.width > enemy.x &&
    this.y < enemy.y + enemy.height &&
    this.height + this.y > enemy.y;
}



Player.prototype.draw = function() {
  this.drawCount++;

  this.animate();
  this.ctx.save();

  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    this.img.height * this.cutY / this.img.rows,
    this.img.width / this.img.frames,
    this.img.height / this.img.rows,
    this.x,
    this.y,
    this.width,
    this.height
  );

  if (this.drawCount % 10 === 0) {
    this.drawCount = 0;
    this.sprite();
  }

  this.ctx.restore()

  this.fires.forEach(function(shoot) {
    if(this.super === true){
      shoot.drawSuper()
      shoot.update();
    } else if (this.super === false) {
      shoot.draw()
      shoot.update();
    }
  }.bind(this));

}

Player.prototype.sprite = function() {
  if (++this.img.frameIndex  > this.currentIndex) {
    this.img.frameIndex = this.currentIndex - 1;
  }
}
