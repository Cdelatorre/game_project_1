function Player(ctx, x, y) {
  this.ctx = ctx;
  this.angle;
  this.color = "blue"

  this.fires = []; // new
  this.fireOn = true; // new

  this.hits = 0;

  this.vx = 0;
  this.vy = 0;

  this.dy;
  this.dx;

  this.keyState = event.type === 'keydown' ? true : false;

  this.img = new Image();
  this.img.src = "./images/player.png";
  this.img.frames = 21;
  this.img.frameIndex = 9;
  this.currentIndex = 9;

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
      this.currentIndex = 1
      break;
    case KEY_DOWN:
      this.movements.down = state;
      this.currentIndex = 9;
      break;
    case KEY_LEFT:
      this.movements.left = state;
      this.currentIndex = 13;
      break;
    case KEY_RIGHT:
      this.movements.right = state;
      this.currentIndex = 5;
      break;
    default:
     


  }
}


Player.prototype.animate = function() {
  if (this.movements.up && this.y > 80) {
    this.vy = -SPEED_MOVE;
  } else if (this.movements.down && this.y < CANVAS_HEIGHT - 135) {
    this.vy = SPEED_MOVE;
  } else {
    this.vy *= FRICTION;
  }

  if (this.movements.right && this.x < CANVAS_WIDTH - 60) {
    this.vx = SPEED_MOVE;
    this.color = "orange"
  } else if (this.movements.left && this.x > 55) {
    this.vx = -SPEED_MOVE;
    this.color = "lightblue"
  } else {
    this.vx *= FRICTION;
  }

  if (this.movements.up && this.movements.left){
    this.currentIndex = 15;
 } else if (this.movements.up && this.movements.right){
  this.currentIndex = 3;
 } else if (this.movements.down && this.movements.right){
  this.currentIndex = 7;
 } else if (this.movements.down && this.movements.left){
  this.currentIndex = 11;
 }

  this.x += this.vx;
  this.y += this.vy;

}


Player.prototype.fire = function() {
  if(this.fireOn){
    var dx = Math.cos(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
    var dy = Math.sin(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
    var f = new Fire(this.ctx, this.angle, this.x, this.y, dx, dy);
    this.fires.push(f);
    this.fireOn = false;
    this.reload();
    console.log(this.fires)
  }
  
}

Player.prototype.reload = function(){
  setTimeout(function(){
    this.fireOn = true;
    // this.fires.shift();
  }.bind(this), 350);
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
    0,
    this.img.width / this.img.frames,
    this.img.height,
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
    shoot.draw()
    shoot.update();
  });

}

Player.prototype.sprite = function() {
  if (++this.img.frameIndex  > this.currentIndex) {
    this.img.frameIndex = this.currentIndex - 1;
  } 
}

 


