function DobleSword(ctx, x, y) {
  this.ctx = ctx;  
  this.img = new Image();
  this.img.src = './images/superpower.png';
  this.x = x;
  this.y = y;
  this.w = 30;
  this.h = 32;
  this.state = true;
}

DobleSword.prototype.draw = function(){
if(this.state === true){
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w, 
    this.h 
  )
}
};

DobleSword.prototype.collideWith = function(player) {

  if(this.x < player.x + player.width &&
  this.x + this.w > player.x &&
  this.y < player.y + player.height &&
  this.h  + this.y > player.y ){
    this.state = false;
    return true;
  }
}

