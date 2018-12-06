//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Skull(ctx, x, y) {
  
  Enemy.call(this, ctx, x, y, 2, 0, 2, 30, 30, 'Skull');
  this.scoreValue = 100;
  this.x = (CANVAS_WIDTH - 50) / 2 ;
  this.img.src = "./images/skull.png";
  this.deadImage = './images/dead_skull.png'
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;
  this.velocityRandom()
}

Skull.prototype = Object.create(Enemy.prototype);
Skull.prototype.constructor = Skull;

Skull.prototype.rand = function (a, b) {
  return Math.floor(Math.random() * b + a);
}

Skull.prototype.velocityRandom = function(){
  setTimeout(function(){
    var rand =  this.rand(0, 5)
    if (rand === 1){
      this.v = 6
    } else {
      this.v = 2
    }
  }.bind(this))
}