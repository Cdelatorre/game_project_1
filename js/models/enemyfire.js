function EnemyFire(ctx, angle, x, y, dx, dy) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.dx = dx * SHOOTS_PLAYER_SPEED  ;
  this.dy = dy * SHOOTS_PLAYER_SPEED;
  this.angle = angle
}

EnemyFire.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x,this.y);
  this.ctx.rotate(this.angle);
  this.ctx.fillStyle = 'blue';
  this.ctx.fillRect(0, -5, 30, 10);
  this.ctx.restore();
}

EnemyFire.prototype.update = function() {

  this.x += this.dx;
  this.y += this.dy;

  if (Math.sign(this.x) < 1 || Math.sign(this.y) < 1 || this.x > CANVAS_WIDTH || this.y > CANVAS_HEIGHT) {
    return false
    //aqui tendrían que dejar de pintarse para no petar el programa
  }
}

EnemyFire.prototype.collideWith = function(player) {
 
  if(this.x < player.x + player.width - 5 &&
    this.x + this.width - 5 > player.x &&
    this.y < player.y + player.height - 5 &&
    this.height - 5 + this.y > player.y){
      
      this.hit++;
      player.hit ++;

      return true;
      
    }
}
