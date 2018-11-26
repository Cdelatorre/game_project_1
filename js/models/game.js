function Game(canvasId) {
  this.canvas = document.getElementById(canvasId)
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;
  this.ctx = this.canvas.getContext('2d');
  this.mouseX;
  this.mouseY;

  this.round1 = [];
  this.initRound1()
  

  this.hits = 0;

  this.drawIntervalCount = 0;

  this.arena = new Arena(this.ctx);
  this.castle = new Castle(this.ctx); 
  this.player = new Player(this.ctx, 350, 250)
  this.enemy = new Enemy(this.ctx, 200, 200)


  document.addEventListener('keydown', this.onKeyEvent.bind(this));
  document.addEventListener('keyup', this.onKeyEvent.bind(this));
  document.addEventListener('mousemove', this.mouseMove.bind(this))
  document.addEventListener('mousedown', this.mouseDown.bind(this));
  // document.addEventListener('mouseup', this.mouseDown.bind(this));
}

Game.prototype.rand = function (a, b) {
  return Math.floor(Math.random() * b + a);
}


Game.prototype.initRound1 = function () {
  var n = 10;
  for (var i = 0; i < n; i++) {
    var e = new Enemy(this.ctx, this.rand(0, CANVAS_WIDTH), this.rand(0, CANVAS_HEIGHT));
    this.round1.push(e);
  }
}

Game.prototype.deleteEnemies = function(){
  var newEnemyArray = this.round1.filter(function(enemy) {
    return enemy.hit < 1;
  });
  var newBulletArray = this.player.fires.filter(function(bullet){
    return bullet.hit < 1;
  })

  this.player.fires = newBulletArray;
  this.round1 = newEnemyArray;
}

Game.prototype.enemyHit = function () {
  return this.round1.some(function (enemy) {
    return this.player.fires.some(function (fire) {
      return fire.collideWith(enemy);
    }.bind(this))
  }.bind(this));
}



Game.prototype.getMousePos = function (evt) {
  var rect = this.canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
};

Game.prototype.mouseDown = function (evt) {
  this.player.fire();

}

Game.prototype.mouseMove = function (evt) {
  var mousePos = this.getMousePos(evt);
  this.mouseX = mousePos.x;
  this.mouseY = mousePos.y;
}

Game.prototype.onKeyEvent = function (event) {
  this.player.onKeyEvent(event);
}

Game.prototype.draw = function () {
  // this.arena.draw()
  this.deleteEnemies();
  // console.log(this.round1)

  if (this.enemyHit()) {
    this.hits += 0.4;
    $('#hit').css("width", this.hits + '%')
  }

  // if (this.playerHit()) {
  //   this.hits += 0.4;
  //   $('#hit').css("width", this.hits + '%')
  // }

  for (var i = 0; i < this.round1.length; i++) {
    this.round1[i].draw();
    this.round1[i].update(this.player.x, this.player.y)
  }

  this.player.draw();
  this.player.update(this.mouseX, this.mouseY);
  // this.castle.draw()

}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.start = function () {
  setInterval(function () {
    this.clear();
    this.draw();
  }.bind(this), 1000 / 60)
};
