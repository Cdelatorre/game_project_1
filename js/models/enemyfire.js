function EnemyFire(ctx, angle, x, y, dx, dy) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.angle = angle
  this.dx = dx * SHOOTS_PLAYER_SPEED;
  this.dy = dy * SHOOTS_PLAYER_SPEED;

  this.width = 30;
  this.height = 10;
  this.hit = 0;

  this.img = new Image();
  this.img.src = "./images/lance.png";
}

EnemyFire.prototype.draw = function() {
  if(this.hit === 0){
  this.ctx.save();
  this.ctx.translate(this.x,this.y);
  this.ctx.rotate(this.angle);
  this.ctx.fillStyle = 'transparent';
  this.ctx.fillRect(0, -5, this.width, this.height);
  this.ctx.drawImage(
    this.img,
    -10,
    -15,
    this.width + 10,
    this.height + 10
  )
  this.ctx.restore();
  }
}

EnemyFire.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
}

EnemyFire.prototype.collideWith = function(player) {
  if (this.x < player.x + player.width &&
  this.x + this.width > player.x &&
  this.y < player.y + player.height &&
  this.height + this.y > player.y){
    this.hit++;
    return true;
  }
}