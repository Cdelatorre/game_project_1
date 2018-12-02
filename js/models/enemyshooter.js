
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function Shooter(ctx, x, y) {
  Enemy.call(this, ctx, x, y, 2, 0, 2, 30, 30);
  this.x = (CANVAS_WIDTH + 50) / 2 ;
  this.fires = [];
  this.attackSpeed = Math.floor(Math.random() * (1500 - 500 + 1)) + 800;
  this.color = 'black';
}

Shooter.prototype = Object.create(Enemy.prototype);
Shooter.prototype.constructor = Shooter;

Shooter.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x,this.y);
  this.ctx.rotate(this.angle);

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

Shooter.prototype.fire = function() {
    this.dx = Math.cos(this.angle); 
    this.dy = Math.sin(this.angle);
    var f = new EnemyFire(this.ctx, this.angle, this.x, this.y, this.dx, this.dy);
    this.fires.push(f);
    this.fireOn = false;
    this.reload();
}

Shooter.prototype.reload = function(){
  setTimeout(function(){
    this.fireOn = true;
  }.bind(this), 350);

  if(this.fires.length > 6){
    this.fires.shift();
 }
}



