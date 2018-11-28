
function Enemy1(ctx, x, y) {
  this.ctx = ctx
  this.x = CANVAS_WIDTH / 2;
  this.y = 70;
  this.v = 2;
  this.angle;
  this.tick = 0;
  this.fires = []
  
  this.width = 20;
  this.height = 20;

  this.hit = 0;

  this.alpha = 1;

  this.nextMoveX;
  this.nextMoveY;
  this.vx;
  this.vy;
  this.nextMove()

  this.oldPositionX;
  this.oldPositionX;
  this.color = 'green';

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
 

  this.ctx.save();
  this.ctx.translate(this.x,this.y);
  this.ctx.rotate(this.angle);

  this.ctx.fillStyle = this.color;
  this.ctx.beginPath()
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.globalAlpha = this.alpha;

  this.ctx.fill();
  
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
 
  // if(this.oldPositionX - this.x > 0 ){
  //   this.color = 'blue';
  // } else if(this.oldPositionX - this.x < 0){
  //   this.color = 'orange'
  // } else if (this.oldPositionY - this.y > 0){
  //   this.color = 'black';
  // } else if (this.oldPositionY - this.y < 0){
  //   this.color = 'purple';
  // } 

  this.oldPositionY = this.y
  this.oldPositionX = this.x;

  if(this.x >= CANVAS_WIDTH - 35 || this.y >= CANVAS_HEIGHT - 110 || this.x <= 35 || this.y <= 70){
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





