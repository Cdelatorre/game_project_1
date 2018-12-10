
//  Enemy(ctx, x, y, hit, tick, speed, width, height)

function SkullFire(ctx, x, y) {
  Skull.call(this, ctx, x, y, 2, 0, 2, 40, 40, 'Bat');
  this.img.src = "./images/skullfire.png";
  this.scoreValue = 200;
}

SkullFire.prototype = Object.create(Skull.prototype);
SkullFire.prototype.constructor = SkullFire;
