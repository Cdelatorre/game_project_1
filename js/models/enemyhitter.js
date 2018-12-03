
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Bat(ctx, x, y) {
  
  Enemy.call(this, ctx, x, y, 2, 0, 2, 30, 30);
  this.type = 'Bat';
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.img.src = "./images/enemy_one.png";
  this.deadImage = "./images/dead_enemy.png"
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;
}

Bat.prototype = Object.create(Enemy.prototype);
Bat.prototype.constructor = Bat;