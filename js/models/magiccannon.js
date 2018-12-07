
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Cannon(ctx, x, y, playerX, playerY) {

  Enemy.call(this, ctx, x, y, 30, 0, 0, 62, 75, 'Shooter-Cannon');
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.fires = []
  this.attackSpeed = 60;
  this.scoreValue = 1000;
  this.y = 200
  this.colorLife = '#4679F7'
  this.img.src = "./images/cannonjs.png";
  this.deadImage = './images/dead_giant.png';
  this.img.frames = 2;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.drawConstant = 15
  this.cutY = 0;

}

Cannon.prototype = Object.create(Enemy.prototype);
Cannon.prototype.constructor = Cannon;

Cannon.prototype.update = function(playerX, playerY) {
 var diffX = playerX - this.x;
 var diffY = playerY - this.y;

 diffX > 0 ? this.x += this.v : this.x -= this.v
 diffY > 0 ? this.y += this.v : this.y -= this.v

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

Cannon.prototype.fire = function() {
  return Shooter.prototype.fire.call(this)
}

Cannon.prototype.reload = function(){
  return Shooter.prototype.reload.call(this)
}
