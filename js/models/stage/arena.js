function Arena(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./images/sheet_arena.png";
  this.img.frames = 5;
  
  this.x = 0;
  this.y = 0;
  this.w = this.ctx.canvas.width;
  this.h = CANVAS_HEIGHT + 100;

}

Arena.prototype.draw = function(){

  this.ctx.drawImage(
    this.img,
    0,
    this.img.height / 2,
    this.img.width / 5,
    this.h,
    this.x,
    this.y, 
    this.w, 
    this.h
  )
};
