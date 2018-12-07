function Enemy(ctx, x, y, hit, tick, v, w, h, type) {
  this.type = type,
  this.ctx = ctx,
  this.x = (CANVAS_WIDTH + 50) / 2 ;
  this.y =  -300;
  this.v = v;
  this.angle;
  this.tick = tick;
  this.fires = []

  this.width = w;
  this.height = h;

  this.hit = hit;
  this.deadImage = './images/dead_enemy.png'

  this.nextMoveX;
  this.nextMoveY;
  this.vx;
  this.vy;
  this.nextMove()
  this.colorLife = 'red'

  this.img = new Image();
  this.img.src;
  this.img.frames = 3;
  this.img.frameIndex = 1;
  this.img.cols = 1;
  this.currentIndex = 1;
  this.cutY = 0;
  this.drawCount = 0;
  this.drawConstant = 10

  this.movements = {
    up: false,
    down: false,
    right: false,
    left: false
  }
}

Enemy.prototype.rand = function(a, b){
  return Math.floor(Math.random()*b + a);
}

Enemy.prototype.draw = function() {
  this.drawCount++;

  this.ctx.save();
  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    this.img.height * this.cutY / this.img.cols,
    this.img.width / this.img.frames,
    this.img.height / this.img.cols,
    this.x,
    this.y,
    this.width,
    this.height
  );

  if(this.type === 'Shooter-Giant' || this.type === 'Shooter-Cannon' || this.type === 'Shooter-CssCannon' || this.type === 'Shooter-HtmlCannon'){
    this.ctx.save();
    this.ctx.translate(this.x,this.y);

    this.ctx.fillStyle = this.colorLife;
    this.ctx.fillRect(0, this.height + 10, this.hit * 2, 10);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.translate(this.x,this.y);
    this.ctx.strokeStyle = '#0E3554';
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeRect(0, this.height + 10, 60, 10);
    this.ctx.restore();
  }

  if(this.hit === 1){
    this.img.src = this.deadImage
    this.v = 0;
  }

  if (this.drawCount % this.drawConstant === 0) {
    this.drawCount = 0;
    this.sprite();
  }

  if(this.type === 'Shooter' || this.type === 'Shooter-Giant' || this.type === 'Wizzard' || this.type === 'Shooter-Cannon' || this.type === 'Shooter-CssCannon' || this.type === 'Shooter-HtmlCannon'){
    this.ctx.restore();
    this.fires.forEach(function(shoot) {
      shoot.draw()
      shoot.update();
    });
  }

  if(this.type === 'Skull' && this.drawCount % 10 === 0){
    this.velocityRandom()
  }
}

Enemy.prototype.nextMove = function(){
  this.nextMoveX = this.rand(0, CANVAS_WIDTH);
  this.nextMoveY = this.rand(0, CANVAS_HEIGHT);

  var dx = this.nextMoveX - this.x;
  var dy = this.nextMoveY - this.y;

  var angle = Math.atan2(dy, dx);
  this.vx = Math.cos(angle);
  this.vy = Math.sin(angle);
}

Enemy.prototype.update = function(playerX, playerY) {

  this.x += (this.vx * this.v)
  this.y += (this.vy * this.v)

  this.oldPositionY = this.y
  this.oldPositionX = this.x;

  if(this.x >= ( CANVAS_WIDTH - this.width ) - this.width || this.y >= (CANVAS_HEIGHT - 110) - this.height || this.x <= this.width || this.y <= 70){
    this.nextMove();
  }

  if(Math.abs(this.nextMoveX - this.x) <= 10 && Math.abs(this.nextMoveY - this.y) <= 100){
    this.nextMove();
  }

  var dx = playerX - this.x;
  var dy = playerY - this.y;
  this.angle = Math.atan2(dy, dx);

  this.tick++;
  if(this.tick >= this.attackSpeed){
    this.tick = 0;
    this.fire()
  }
}

Enemy.prototype.sprite = function() {
  if (++this.img.frameIndex  > this.currentIndex) {
    this.img.frameIndex = this.currentIndex - 1  ;
  }
}

Enemy.prototype.fire = function() {
  this.dx = Math.cos(this.angle);
  this.dy = Math.sin(this.angle);

  var f = new EnemyFire(this.ctx, this.angle, this.x, this.y, this.dx, this.dy);
  var wf = new WizzardFire(this.ctx, this.angle, this.x, this.y, this.dx, this.dy);
  var cf = new CannonFire(this.ctx, this.angle, this.x, this.y, this.dx, this.dy, "./images/virgulilla.png");
  var cssf = new CannonFire(this.ctx, this.angle, this.x, this.y, this.dx, this.dy, "./images/idfire.png");
  var htmlf = new CannonFire(this.ctx, this.angle, this.x, this.y, this.dx, this.dy, "./images/tagfire.png");

  if(this.type === 'Shooter' || this.type === 'Shooter-Giant'){
    this.fires.push(f);
  } else if (this.type === 'Wizzard'){
    this.fires.push(wf);
  } else if (this.type === 'Shooter-Cannon'){
    this.fires.push(cf);
  } else if (this.type === 'Shooter-CssCannon'){
    this.fires.push(cssf);
  }  else if (this.type === 'Shooter-HtmlCannon'){
    this.fires.push(htmlf);
  }

  this.fireOn = false;
  this.reload();
}

Enemy.prototype.reload = function(){
  setTimeout(function(){
    this.fireOn = true;
  }.bind(this), 350);

  if(this.fires.length > 6){
    this.fires.shift();
 }
}
