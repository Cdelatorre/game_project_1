
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Wizzard(ctx, x, y) {
  Enemy.call(this, ctx, x, y, 3, 0, 1.5, 30, 30, 'Wizzard');
  this.scoreValue = 200;
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.attackSpeed = Math.floor(Math.random() * (1200 - 500)) + 400;

  this.img.src = "./images/wizzard.png";
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;
}

Wizzard.prototype = Object.create(Enemy.prototype);
Wizzard.prototype.constructor = Wizzard;

