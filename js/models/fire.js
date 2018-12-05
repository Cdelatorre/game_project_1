function Fire(ctx, angle, x, y, dx, dy) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;


  this.width = 30;
  this.height = 10;
  this.img = new Image();
  this.img.src = "./images/sword.png";
  this.super = false;
  this.hit = 0;

  this.dx = dx * SHOOTS_PLAYER_SPEED;
  this.dy = dy * SHOOTS_PLAYER_SPEED;
  this.angle = angle;
}

Fire.prototype.draw = function () {
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(this.angle);
  this.ctx.fillStyle = 'transparent';
  this.ctx.fillRect(-10, -13, this.width, this.height);
  this.ctx.drawImage(
    this.img,
    -10,
    -15,
    this.width + 10,
    this.height + 10
  )
  this.ctx.restore();
};

Fire.prototype.drawSuper = function () {
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(this.angle);
  this.ctx.fillStyle = 'transparent';
  this.ctx.fillRect(-10, -13, this.width, this.height);
  this.ctx.drawImage(
    this.img,
    -10,
    -15,
    this.width + 10,
    this.height + 10
  )
  this.ctx.restore();

  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(this.angle);
  this.ctx.fillStyle = 'transparent';
  this.ctx.fillRect(-10, -7, this.width, this.height);
  this.ctx.drawImage(
    this.img,
    -10,
    5,
    this.width + 10,
    this.height + 10
  )
  this.ctx.restore();
  }

Fire.prototype.collideWith = function(enemy) {
 
  if(this.x < enemy.x + enemy.width - 5 &&
    this.x + this.width - 5 > enemy.x &&
    this.y < enemy.y + enemy.height - 5 &&
    this.height - 5 + this.y > enemy.y){
      enemy.hit --;
      if(enemy.hit === 1){
        SCORE += enemy.scoreValue;
        setTimeout(function(){
          enemy.hit --;
        }.bind(this),100)  
      }    
      this.hit++;
      return true;
    }
}



Fire.prototype.update = function() { ///             MOUSE D

  this.x += this.dx;
  this.y += this.dy;

  if (Math.sign(this.x) < 1 || Math.sign(this.y) < 1 || this.x > CANVAS_WIDTH || this.y > CANVAS_HEIGHT) {

    //aqui tendrían que dejar de pintarse para no petar el programa
  }
}
