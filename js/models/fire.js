function Fire(ctx, angle, x, y, dx, dy) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 10;
  this.color = 'red'

  this.hit = 0;

  this.dx = dx * SHOOTS_PLAYER_SPEED;
  this.dy = dy * SHOOTS_PLAYER_SPEED;
  this.angle = angle;

 
}

Fire.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x,this.y);
  this.ctx.rotate(this.angle);
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(-10, -13, this.width, this.height);
  this.ctx.restore();
}


Fire.prototype.collideWith = function(enemy) {
 
  if(this.x < enemy.x + enemy.width - 5 &&
    this.x + this.width - 5 > enemy.x &&
    this.y < enemy.y + enemy.height - 5 &&
    this.height - 5 + this.y > enemy.y){
      
      this.hit++;
      enemy.hit ++;

      return true;
      
    }
}



Fire.prototype.update = function() {

  this.x += this.dx;
  this.y += this.dy;

  if (Math.sign(this.x) < 1 || Math.sign(this.y) < 1 || this.x > CANVAS_WIDTH || this.y > CANVAS_HEIGHT) {
    return false
    //aqui tendrían que dejar de pintarse para no petar el programa
  }
}
