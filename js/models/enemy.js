function Enemy(ctx, x, y, hit, tick, v, w, h) {
  this.ctx = ctx
  this.x = (CANVAS_WIDTH + 50) / 2 ;
  this.y =  -200;
  this.v = v;
  this.angle;
  this.tick = tick;
  this.fires = []
  
  this.width = w;
  this.height = h;

  this.hit = hit;

  this.nextMoveX;
  this.nextMoveY;
  this.vx;
  this.vy;
  this.nextMove()

  this.img = new Image();
  this.img.src;
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;
  this.drawCount = 0;
  
  this.movements = {
    up: false,
    down: false,
    right: false,
    left: false
  }
}

Enemy.prototype.rand = function(a, b){
  return Math.floor(Math.random()*b + a);
}

Enemy.prototype.draw = function() {
  this.drawCount++;
 
  this.ctx.save();
  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    this.img.height * this.cutY / this.img.cols,
    this.img.width / this.img.frames,
    this.img.height / this.img.cols,
    this.x,
    this.y,
    this.width,
    this.height
  );
  
  if (this.drawCount % 10 === 0) {
    this.drawCount = 0;
    this.sprite();
  }
  this.ctx.restore();
}

Enemy.prototype.nextMove = function(){
  this.nextMoveX = this.rand(0, CANVAS_WIDTH);
  this.nextMoveY = this.rand(0, CANVAS_HEIGHT);

  var dx = this.nextMoveX - this.x;
  var dy = this.nextMoveY - this.y;

  var angle = Math.atan2(dy, dx);
  this.vx = Math.cos(angle);
  this.vy = Math.sin(angle);
}

Enemy.prototype.update = function(playerX, playerY) {
 
  this.x += (this.vx * this.v)
  this.y += (this.vy * this.v)

  this.oldPositionY = this.y
  this.oldPositionX = this.x;

  if(this.x >= CANVAS_WIDTH - this.width || this.y >= CANVAS_HEIGHT - 125 || this.x <= this.width || this.y <= 70){
    this.nextMove();
  }
  if(Math.abs(this.nextMoveX - this.x) <= 10 && Math.abs(this.nextMoveY - this.y) <= 100){
    this.nextMove();
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

Enemy.prototype.sprite = function() {
  if (++this.img.frameIndex  > this.currentIndex) {
    this.img.frameIndex = this.currentIndex - 1;
  }
}





