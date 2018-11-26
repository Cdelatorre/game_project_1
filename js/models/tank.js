// function Tank(ctx, x, y) {
//   this.ctx = ctx
//   this.x = x;
//   this.y = y
//   this.angle;
//   this.fires = [];

//   this.vx = 0;
//   this.vy = 0;

//   this.fireOn = true;

//   this.movements = {
//     up: false,
//     down: false,
//     right: false,
//     left: false
//   }
// }

// Tank.prototype.update = function(mouseX, mouseY) {
//   var dx = mouseX - this.x;
//   var dy = mouseY - this.y;
//   this.angle = Math.atan2(dy, dx);
// }

// Tank.prototype.onKeyEvent = function(event) {
//   var state = event.type === 'keydown' ? true : false;
//   switch (event.keyCode) {
//     case KEY_UP:
//       this.movements.up = state;
//       break;
//     case KEY_DOWN:
//       this.movements.down = state;
//       break;
//     case KEY_LEFT:
//       this.movements.left = state;
//       break;
//     case KEY_RIGHT:
//       this.movements.right = state;
//       break;
//   }
// }

// Tank.prototype.animate = function() {
//   if (this.movements.up && this.y > 20) {
//     this.vy = -SPEED_MOVE;
//   } else if (this.movements.down && this.y < CANVAS_HEIGHT - 20) {
//     this.vy = SPEED_MOVE;
//   } else {
//   this.vy *= FRICTION;
//   }

//   if (this.movements.right && this.x < CANVAS_WIDTH - 20) {
//     this.vx = SPEED_MOVE;
//   } else if (this.movements.left && this.x > 20) {
//     this.vx = -SPEED_MOVE;
//   } else {
//     this.vx *= FRICTION;
//   }

//   this.x += this.vx;
//   this.y += this.vy;

// }

// Tank.prototype.fire = function() {
//   if(this.fireOn){
//     var dx = Math.cos(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
//     var dy = Math.sin(this.angle); //devuelve un numero que será util para resolver lo de la posicion del personaje cuando dispara
//     var f = new Fire(this.ctx, this.angle, this.x, this.y, dx, dy);
//     this.fires.push(f);
//     this.fireOn = false;
//     this.reload();
//     console.log(this.fires)
//   }
  
// }

// Tank.prototype.reload = function(){
//   setTimeout(function(){
//     this.fireOn = true;
//     // this.fires.shift();
//   }.bind(this), 350);
// }

// Tank.prototype.collideWith = function(enemy) {

//   return this.x < enemy.x + enemy.width &&
//     this.x + this.width > enemy.x &&
//     this.y < enemy.y + enemy.height &&
//     this.height + this.y > enemy.y;
// }

// Tank.prototype.draw = function() {
//   this.animate();
  
//   this.fires.forEach(function(shoot) {
//     shoot.draw()
//     shoot.update();

//   });

// }
