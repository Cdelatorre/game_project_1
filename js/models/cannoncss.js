
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function CannonCss(ctx, x, y, playerX, playerY) {

  Enemy.call(this, ctx, x, y, 30, 0, 0, 62, 75, 'Shooter-CssCannon');
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.fires = []
  this.attackSpeed = 50;
  this.scoreValue = 1150;
  this.y = 200
  this.colorLife = '#f14725'

  this.img.src = "./images/cannoncss.png";
  this.deadImage = './images/dead_giant.png';
  this.img.frames = 2;
  this.img.frameIndex = 1;
  this.img.cols = 1;

  this.floor = new Image();
  this.floor.src = "./images/floorcss.png";

  this.currentIndex = 1;
  this.drawConstant = 15
  this.cutY = 0;

}

CannonCss.prototype = Object.create(Cannon.prototype);
CannonCss.prototype.constructor = CannonCss;
