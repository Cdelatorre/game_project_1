function Coin(ctx, x, y) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = './images/coin.png';
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 32;
    this.state = true;
}

Coin.prototype.draw = function(){
 return  Potion.prototype.draw.call(this)
};

Coin.prototype.collideWith = function(player) {
    if(this.x < player.x + player.width &&
    this.x + this.w > player.x &&
    this.y < player.y + player.height &&
    this.h  + this.y > player.y ){
      this.state = false;
      return true;
    }
}
