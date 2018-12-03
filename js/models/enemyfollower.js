
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Giant(ctx, x, y, playerX, playerY) {

  Enemy.call(this, ctx, x, y, 1, 0, 1, 30, 30);
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.fires = [];
  this.attackSpeed = 100;
  this.y = -100
  this.img.src = "./images/enemy_one.png";
  this.deadImage = "./"
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;

}

Giant.prototype = Object.create(Enemy.prototype);
Giant.prototype.constructor = Giant;

Giant.prototype.update = function(playerX, playerY) {
 var diffX = playerX - this.x;
 var diffY = playerY - this.y;

//  if(diffX > 0){ this.x += this.v } else { this.x -= this.v }
 diffX > 0 ? this.x += this.v : this.x -= this.v
  if(diffY > 0){ 
    this.y += this.v 
  } else { 
    this.y -= this.v 
  }

 if(this.x == playerX || this.y == playerY){ this.x += 0; this.y += 0; }

  var dx = playerX - this.x;
  var dy = playerY - this.y;
  this.angle = Math.atan2(dy, dx);

  this.tick++;
  if(this.tick >= this.attackSpeed){
    this.tick = 0;
    this.fire();
  }
}

Giant.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x,this.y);

  this.ctx.fillStyle = this.color;
  this.ctx.beginPath()
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.globalAlpha = this.alpha;
  this.ctx.fill();
  this.ctx.restore();

  this.fires.forEach(function(shoot) {
    shoot.draw()
    shoot.update();
  });
}

Giant.prototype.fire = function() { 
  return Shooter.prototype.fire.call(this)
}

Giant.prototype.reload = function(){
  return Shooter.prototype.reload.call(this)
}
