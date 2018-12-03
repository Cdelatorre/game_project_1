
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Shooter(ctx, x, y) {
  Enemy.call(this, ctx, x, y, 2, 0, 2, 30, 30);
  this.type = 'Shooter';
  this.scoreValue = 250;

  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.fires = [];
  this.attackSpeed = Math.floor(Math.random() * (1500 - 500 + 1)) + 800;
  this.color = 'black';

  this.img.src = "./images/enemy_two.png";
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;
}

Shooter.prototype = Object.create(Enemy.prototype);
Shooter.prototype.constructor = Shooter;



