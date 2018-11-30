
function Enemy1(ctx, x, y) {
  this.ctx = ctx
  this.x = (CANVAS_WIDTH - 32) / 2 ;
  this.y = -70;
  this.v = 2;
  this.angle;
  this.tick = 0;
  this.fires = []
  
  this.width = 30;
  this.height = 30;

 
  this.hit = 1;

  this.alpha = 1;

  this.nextMoveX;
  this.nextMoveY;
  this.vx;
  this.vy;
  this.nextMove()

  this.img = new Image();
  this.img.src = "./images/enemy_one.png";
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

Enemy1.prototype.rand = function(a, b){
  return Math.floor(Math.random()*b + a);
}

Enemy1.prototype.draw = function() {
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

Enemy1.prototype.nextMove = function(){
  this.nextMoveX = this.rand(0, CANVAS_WIDTH);
  this.nextMoveY = this.rand(0, CANVAS_HEIGHT);

  var dx = this.nextMoveX - this.x;
  var dy = this.nextMoveY - this.y;

  var angle = Math.atan2(dy, dx);
  this.vx = Math.cos(angle);
  this.vy = Math.sin(angle);

}


Enemy1.prototype.update = function(tankX, tankY) {
 
  this.x += (this.vx * this.v)
  this.y += (this.vy * this.v)

  this.oldPositionY = this.y
  this.oldPositionX = this.x;

  if(this.x >= CANVAS_WIDTH - 35 || this.y >= CANVAS_HEIGHT - 125 || this.x <= 35 || this.y <= 70){
    this.nextMove();
  }


  if(Math.abs(this.nextMoveX - this.x) <= 10 && Math.abs(this.nextMoveY - this.y) <= 100){
    this.nextMove();
  }

  var dx = tankX - this.x;
  var dy = tankY - this.y;
  this.angle = Math.atan2(dy, dx);

  this.tick++;
  if(this.tick >= this.attackSpeed){
    this.tick = 0;
    this.fire()
  }
}

Enemy1.prototype.sprite = function() {
  if (++this.img.frameIndex  > this.currentIndex) {
    this.img.frameIndex = this.currentIndex - 1;
  }
}





