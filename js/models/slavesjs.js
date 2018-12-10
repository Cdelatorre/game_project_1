
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function SlaveJs(ctx, x, y) {
  Bat.call(this, ctx, x, y, 2, 0, 2, 30, 30, 'Bat');
  this.img.src = "./images/slavesjs.png";
  this.scoreValue = 150;
}

SlaveJs.prototype = Object.create(Bat.prototype);
SlaveJs.prototype.constructor = SlaveJs;
