function WizzardFire(ctx, angle, x, y, dx, dy){
  EnemyFire.call(ctx, angle, x, y, dx, dy);

  this.ctx = ctx;
  this.angle = angle
  this.x = x;
  this.y = y;
  this.dx = dx * SHOOTS_PLAYER_SPEED;
  this.dy = dy * SHOOTS_PLAYER_SPEED;

  this.hit = 0;

  this.width = 30;
  this.height = 30;
  this.img = new Image();
  this.img.src = "./images/energy2.png";
}

WizzardFire.prototype = Object.create(EnemyFire.prototype);
WizzardFire.prototype.constructor = WizzardFire;