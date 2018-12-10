
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Cannon(ctx, x, y, playerX, playerY) {

  Enemy.call(this, ctx, x, y, 30, 0, 0, 62, 75, 'Shooter-Cannon');
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.attackSpeed = 60;
  this.scoreValue = 1000;
  this.y = 200
  this.colorLife = '#4679F7'

  this.img.src = "./images/cannonjs.png";
  this.deadImage = './images/dead_giant.png';
  this.img.frames = 2;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  
  this.floor = new Image();
  this.floor.src = "./images/floorjs.png";

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


Cannon.prototype.draw = function() {
  this.drawCount++;

  this.ctx.drawImage(
    this.floor,
    (CANVAS_WIDTH - 192 ) / 2 ,
    (CANVAS_HEIGHT - this.floor.height) / 2 ,
    200,
    200
  )

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

    this.ctx.save();
    this.ctx.translate(this.x,this.y);

    this.ctx.fillStyle = this.colorLife;
    this.ctx.fillRect(0, this.height + 10, this.hit * 2, 10);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.translate(this.x,this.y);
    this.ctx.strokeStyle = '#0E3554';
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeRect(0, this.height + 10, 60, 10);
    this.ctx.restore();

   

  if(this.hit === 1){
    this.img.src = this.deadImage
    this.v = 0;
  }

  if (this.drawCount % this.drawConstant === 0) {
    this.drawCount = 0;
    this.sprite();
  }

    this.ctx.restore();
    this.fires.forEach(function(shoot) {
      shoot.draw()
      shoot.update();
  })


}
