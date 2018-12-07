
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function CannonHtml(ctx, x, y, playerX, playerY) {

  Enemy.call(this, ctx, x, y, 30, 0, 0, 62, 75, 'Shooter-HtmlCannon');
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.attackSpeed = 40;
  this.scoreValue = 1200;
  this.y = 200
  this.colorLife = '#13c6ab'

  this.img.src = "./images/cannonhtml.png";
  this.deadImage = './images/dead_giant.png';
  this.img.frames = 2;
  this.img.frameIndex = 1;
  this.img.cols = 1;

  this.floor = new Image();
  this.floor.src = "./images/floorhtml.png";

  this.currentIndex = 1;
  this.drawConstant = 15
  this.cutY = 0;

}

CannonHtml.prototype = Object.create(Cannon.prototype);
CannonHtml.prototype.constructor = CannonHtml;
