function Player(ctx, x, y) {
  this.ctx = ctx
  this.x = x;
  this.y = y;
  this.angle;
  this.color = "blue"

  this.fires = []; // new
  this.fireOn = true; // new

  this.width = 50;
  this.height = 50;

  this.hits = 0;

  this.vx = 0;
  this.vy = 0;

  this.dy;
  this.dx;

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
      this.color = "red";
      break;
    case KEY_DOWN:
      this.movements.down = state;
      this.color = "blue";
      break;
    case KEY_LEFT:
      this.movements.left = state;
      this.color = "lightblue"
      break;
    case KEY_RIGHT:
      this.movements.right = state;
      this.color = "orange"
      break;

  }
}


Player.prototype.animate = function() {
  if (this.movements.up && this.y > 80) {
    this.vy = -SPEED_MOVE;
    this.color = "red";
  } else if (this.movements.down && this.y < CANVAS_HEIGHT - 135) {
    this.vy = SPEED_MOVE;
    this.color = "blue";
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
   this.color = "yellow"
 } else if (this.movements.up && this.movements.right){
    this.color = "purple"
 } else if (this.movements.down && this.movements.right){
     this.color = "grey"
 } else if (this.movements.down && this.movements.left){
      this.color = "black"
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
  this.animate();
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.fillStyle = this.color;
  this.ctx.beginPath()
  this.ctx.fillRect(-20, -10, this.width, this.height);
  this.ctx.fill();
  this.ctx.restore()

  this.fires.forEach(function(shoot) {
    shoot.draw()
    shoot.update();

  });

}
