
function Enemy(ctx, x, y) {
  this.ctx = ctx
  this.x = CANVAS_WIDTH / 2;
  this.y = 70;
  this.v = 2;
  this.angle;
  this.fires = [];
  this.attackSpeed = Math.floor(Math.random() * (1500 - 500 + 1)) + 800;
  this.tick = 0;
  
  this.width = 20;
  this.height = 20;

  this.hit = 0;

  this.alpha = 1;

  this.nextMoveX;
  this.nextMoveY;
  this.vx;
  this.vy;
  this.nextMove()

  this.oldPositionX;
  this.oldPositionX;
  this.color = 'black';

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
 

  this.ctx.save();
  this.ctx.translate(this.x,this.y);
  this.ctx.rotate(this.angle);

  this.ctx.fillStyle = this.color;
  this.ctx.beginPath()
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.globalAlpha = this.alpha;

  this.ctx.fill();
  
  this.ctx.restore();

  this.fires.forEach(function(shoot) {
    shoot.draw()
    shoot.update();
  });

  
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


Enemy.prototype.update = function(tankX, tankY) {
 
  this.x += (this.vx * this.v)
  this.y += (this.vy * this.v)
 
  // if(this.oldPositionX - this.x > 0 ){
  //   this.color = 'blue';
  // } else if(this.oldPositionX - this.x < 0){
  //   this.color = 'orange'
  // } else if (this.oldPositionY - this.y > 0){
  //   this.color = 'black';
  // } else if (this.oldPositionY - this.y < 0){
  //   this.color = 'purple';
  // } 

  this.oldPositionY = this.y
  this.oldPositionX = this.x;

  if(this.x >= CANVAS_WIDTH - 35 || this.y >= CANVAS_HEIGHT - 110 || this.x <= 35 || this.y <= 70){
    this.nextMove();
  }


  if(Math.abs(this.nextMoveX - this.x) <= 10 && Math.abs(this.nextMoveY - this.y) <= 100){
    this.nextMove();
  }

  var dx = tankX - this.x;
  var dy = tankY - this.y;
  this.angle = Math.atan2(dy, dx);

  this.tick++;
  if(this.tick >= this.attackSpeed){
    this.tick = 0;
    this.fire()
  }
}



Enemy.prototype.fire = function() {

    this.dx = Math.cos(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
    this.dy = Math.sin(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
    
    var f = new EnemyFire(this.ctx, this.angle, this.x, this.y, this.dx, this.dy);
    this.fires.push(f);
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



