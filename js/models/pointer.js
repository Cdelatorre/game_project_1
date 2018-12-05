function Pointer (ctx) {
  this.ctx = ctx;
  this.w = 50;
  this.h = 50;
  this.img = new Image();
  this.img.src = "./images/pointer_ironhack.png";
}

Pointer.prototype.draw = function(x, y) {
  this.ctx.drawImage(
    this.img,
    x - (this.w / 2),
    y - (this.h / 2),
    this.w,
    this.h
  );
}
