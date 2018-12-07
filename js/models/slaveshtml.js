
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function SlaveHtml(ctx, x, y) {
  Bat.call(this, ctx, x, y, 2, 0, 3, 30, 30, 'Bat');
  this.img.src = "./images/htmlslaves.png";
  this.scoreValue = 200;
}

SlaveHtml.prototype = Object.create(Bat.prototype);
SlaveHtml.prototype.constructor = SlaveHtml;
