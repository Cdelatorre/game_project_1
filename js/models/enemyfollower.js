
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Giant(ctx, x, y, playerX, playerY) {

  Enemy.call(this, ctx, x, y, 1, 0, 2, 30, 30);
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.y = -100
  this.img.src = "./images/enemy_one.png";
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;

}

Giant.prototype = Object.create(Enemy.prototype);
Giant.prototype.constructor = Giant;

Giant.prototype.nextMove = function(playerX, playerY){

  this.nextMoveX = playerX;
  this.nextMoveY = playerY;

  var dx = this.nextMoveX - this.x;
  var dy = this.nextMoveY - this.y;

  var angle = Math.atan2(dy, dx);
  this.vx = Math.cos(angle);
  this.vy = Math.sin(angle);
}

Giant.prototype.update = function(playerX, playerY) {
  
 
  this.x += (this.vx * this.v)
  this.y += (this.vy * this.v)

  this.oldPositionY = this.y;
  this.oldPositionX = this.x;


  if(this.x >= CANVAS_WIDTH - this.width || this.y >= CANVAS_HEIGHT - 125 || this.x <= this.width || this.y <= 70){
    this.nextMove(playerX, playerY);
  }
  if(Math.abs(this.nextMoveX - this.x) <= 10 && Math.abs(this.nextMoveY - this.y) <= 100){
    this.nextMove(playerX, playerY);
  }

  var dx = playerX - this.x;
  var dy = playerY - this.y;
  this.angle = Math.atan2(dy, dx);

  this.tick++;
  if(this.tick >= this.attackSpeed){
    this.tick = 0;
    this.fire()
  }
}