function CannonFire(ctx, angle, x, y, dx, dy){
  EnemyFire.call(ctx, angle, x, y, dx, dy);

  this.ctx = ctx;
  this.angle = angle
  this.x = x + 30;
  this.y = y + 10;
  this.dx = dx * SHOOTS_PLAYER_SPEED;
  this.dy = dy * SHOOTS_PLAYER_SPEED;

  this.hit = 0;

  this.width = 30;
  this.height = 10;
  this.img = new Image();
  this.img.src = "./images/virgulilla.png";
}

CannonFire.prototype = Object.create(EnemyFire.prototype);
CannonFire.prototype.constructor = CannonFire;