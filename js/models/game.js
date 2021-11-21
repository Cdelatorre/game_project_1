function Game(canvasId) {

  /*----- Canvas Data & Info -----*/

  this.canvas = document.getElementById(canvasId)
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;
  this.ctx = this.canvas.getContext('2d');
  this.mouseX;
  this.mouseY;
  this.gameOn = false;

  /*------- Audios ------*/

  this.audioBackground = document.getElementById("background-audio")
  this.audioMenu = document.getElementById("menu-audio")
  this.audioPotion = document.getElementById("potion-audio")
  this.audioCoin = document.getElementById("coin-audio")
  this.audioGameOver = document.getElementById("game-over-audio")
  this.audioOuch = document.getElementById("ouch-audio")
  this.audioWin = document.getElementById("win-audio")
  this.audioPowerUp = document.getElementById("power-up-audio")

  /*----- jQuery Objects -----*/

  this.$hit = $('#hit');
  this.$introduction = $('#introduction')
  this.$blackdiv = $('#blackdiv')
  this.$startDiv = $("#start-game-div")
  this.$instructionsDiv = $("#instructions-div")
  this.$instructions = $('#instructions')
  this.$scoreDiv = $('#scores-div')
  this.$scoresRankText = $('#game-scores')
  this.$dataDiv = $('#data-div')
  this.$heartLife = $('#heart-life')
  this.$scoreData = $('#score-count')
  this.$introMenu = $('#canvas-intro')
  this.$blood = $('#red-game-over');
  this.$gameOver = $('#game-over');
  this.$scorePoints = $('.score-points')
  this.$youWinDiv = $('#you-win')
  this.$youWin = $('#box-you-win')
  this.$nameInput = $('#name-input')
  this.$scoresRank = $('#scores-rank')
  this.$rankingDiv = $('#ranking-div')
  this.$ranking = $('#ranking')
  this.$rankDiv = $('.rank-div')

  this.$closeRanking = $('#close-ranking').click(this.closeRank.bind(this))
  this.$scoresRankText = $('#game-scores').click(this.openRank.bind(this))
  this.$submit = $('#submit').click(this.saveScore.bind(this))
  this.$closeInstructions = $('#close-instructions').click(this.closeInstructions.bind(this))
  this.$instructionsOptions = $('#game-instructions').click(this.openInstructions.bind(this))
  this.$startOptions = $('#start-game').click(this.startGame.bind(this))
  this.$tryAgain = $('.try-again').click(this.restart.bind(this))

  /*------ Battle Info -----*/

  this.round = [];

  this.initRound1();
  this.introduction()
  this.egg()


  this.round1State = 0;
  this.round2State = 0;
  this.round3State = 0;
  this.round4State = 0;
  this.round5State = 0;

  this.noHitTime = false;

  this.hits = 0;
  this.randomX = this.rand(100, CANVAS_WIDTH - 150);
  this.randomY = this.rand(100, CANVAS_HEIGHT - 300)

  this.drawIntervalCount = 0;
  this.potionState = 0;

  /*----- Scenary and Characters -----*/

  this.pointer = new Pointer(this.ctx, this.mouseX, this.mouseY);
  this.arena = new Arena(this.ctx);
  this.castle = new Castle(this.ctx);
  this.player = new Player(this.ctx, 350, 250);
  this.potion = new Potion(this.ctx, 200, 200)

  this.potions = [];
  this.supers = [];
  this.coins = [];

  /*------ Event Listeners -----*/

  document.addEventListener('keydown', this.onKeyEvent.bind(this));
  document.addEventListener('keyup', this.onKeyEvent.bind(this));
  document.addEventListener('mousemove', this.mouseMove.bind(this));
  document.addEventListener('mousedown', this.mouseDown.bind(this));

  /*-----  Scores ------*/

  this.score = this.getScore();
  this.lastBest = Object.keys(this.score)[Object.keys(this.score).length - 1]
  this.lastScore = Object.values(this.score)[Object.keys(this.score).length - 1]
  this.$bestName = $('#best-name')
  this.$bestScore = $('#best-score')
  this.$arrObjectScore = []
  this.bestScore()
  this.orderArray(this.$arrObjectScore)
  this.printBest(this.$arrObjectScore)


}

/*------- Set Scores -------*/

Game.prototype.getScore = function() {
  var scores = localStorage.getItem('scores') || '{}';
  return JSON.parse(scores);
}

Game.prototype.addScore = function(name, value) {
  var scores = this.getScore();
  scores[name] = value;
  localStorage.setItem('scores', JSON.stringify(scores));
}

Game.prototype.saveScore = function(){
  if(this.$nameInput.val().length !=0){
    this.addScore(this.$nameInput.val(), score)
  }
}

/*------ Actions with socres ------*/

Game.prototype.bestScore = function() {
  for (var key in this.score) {
    var name = key;
    var puntation = this.score[key]
    this.$arrObjectScore.push({
      'name': name,
      'score': puntation
    })
  }
}

Game.prototype.orderArray = function(array) {
  array.sort(function(a, b) {
    return b.score - a.score;
  });
}

Game.prototype.printBest = function(array){
  for ( var i = 0; i < 5; i ++){
    var divRank = $('<div/>').attr({'class':'rank-div'})
    var textName = document.createTextNode(array[i].name);
    var textSeparated = document.createTextNode('______________');
    var textScore = document.createTextNode(array[i].score);
    var spanName = $('<span />').attr({'class':'rank-name'}).append(textName);
    var spanLine = $('<span />').attr({'class':'separated-dots'}).append(textSeparated);
    var spanScore = $('<span />').attr({'class':'rank-score'}).append(textScore);
    divRank.append(spanName,spanLine,spanScore)
    this.$ranking.append(divRank)
  }
}



/*------- Functions general game --------*/

Game.prototype.rand = function (a, b) {
  return Math.floor(Math.random() * b + a);
}

Game.prototype.egg = function() {
  var egg = new Egg();
  egg
    .addCode("l,o,s,e,r", function() {
      jQuery('#egggif').fadeIn(500, function() {
        window.setTimeout(function() {
          jQuery('#egggif').hide();
        }, 5000);
      });
    })
    .addHook(function() {
      this.player.hits = 0;
      $('#hit').css("width", 0 + '%')
    }.bind(this)).listen();

  var eggCanallita = new Egg();
  eggCanallita
    .addCode("c,a,n,a,l,l,i,t,a", function() {
      jQuery('#egggif').fadeIn(500, function() {
        window.setTimeout(function() {
          jQuery('#egggif').hide();
        }, 5000);
      });
    })
    .addHook(function() {
      this.player.hits = 0;
      $('#canallita').show()
    }.bind(this)).listen();
}


/*-------- Introductions / menus & interactions --------*/

Game.prototype.introduction = function () {
  this.$youWinDiv.hide()
  this.$youWin.hide()
  this.$blood.hide()
  this.$gameOver.hide()
  this.$introduction.hide().delay(1000).fadeIn(2000);
  setTimeout(function () {
    this.$introduction.fadeOut(1000);
    this.$blackdiv.show().delay(1000).fadeOut()
  }.bind(this), 6000)
  this.principalMenuOptions()
  this.$dataDiv.hide()
  this.$instructions.hide()
  this.$rankingDiv.hide()
}

Game.prototype.principalMenuOptions = function () {

  this.$startDiv.hover(
    function () {
      this.$startOptions.siblings('.swords-select').fadeIn(100);
      this.audioMenu.play()
    }.bind(this),
    function () {
      this.$startOptions.siblings('.swords-select').fadeOut(100)
      this.audioMenu.play()
    }.bind(this)
  );

  this.$instructionsDiv.hover(
    function () {
      this.$instructionsOptions.siblings('.swords-select').fadeIn(100);
      this.audioMenu.play()
    }.bind(this),
    function () {
      this.$instructionsOptions.siblings('.swords-select').fadeOut(100)
      this.audioMenu.play()
    }.bind(this)
  );

  this.$scoreDiv.hover(
    function () {
      this.$scoresRankText.siblings('.swords-select').fadeIn(100);
      this.audioMenu.play()
    }.bind(this),
    function () {
      this.$scoresRankText.siblings('.swords-select').fadeOut(100)
      this.audioMenu.play()
    }.bind(this)
  );
}

Game.prototype.openInstructions = function () {
  this.$instructions.fadeIn()
}

Game.prototype.closeInstructions = function () {
  this.$instructions.fadeOut()
}

Game.prototype.closeRank = function(){
  this.$rankingDiv.fadeOut()
}

Game.prototype.openRank = function(){
  this.$rankingDiv.fadeIn()
}

Game.prototype.roundText = function (num){
  $('#waves img:nth-child(' + num + ')').fadeIn(2000).animate({
    width: "410px",
    height: '110px'
  }, 100).fadeOut()
}

/*-----Init Rounds & Finalize rounds --- */

Game.prototype.startGame = function () {
  this.start()
  this.$introMenu.fadeOut(1000)
  this.$dataDiv.fadeIn()
  this.roundText(1)
}

Game.prototype.restart = function (){
  location.reload();
}

Game.prototype.gameOver = function(){
  this.audioBackground.pause();
  this.audioGameOver.play()
  this.$blood.fadeIn(3000);
  this.$gameOver.delay(2500).fadeIn(1000)
  this.$scorePoints.text(score)
  setTimeout(function(){
    this.stop()
  }.bind(this),1000)
}

Game.prototype.youWin = function(){
  this.audioBackground.pause()
  this.audioWin.play()
  this.player.v = 0
  this.player.img.rows = 1;
  this.player.img.frameIndex = 1;
  this.player.currentIndex = 1;
  this.player.cutY = 0

  this.player.img.src = './images/winner.png'

  this.$youWinDiv.fadeIn(3000);
  this.$youWin.delay(2500).fadeIn(1000)
  this.$scorePoints.text(score)
  setTimeout(function(){
    this.stop()
  }.bind(this),100)
}

Game.prototype.stop = function() {
  clearInterval(this.intervalId);
  this.drawIntervalId = undefined;
}

Game.prototype.initRound = function (quantity, enemyType) {
  for (var i = 0; i < quantity; i++) {
    var e = new enemyType(this.ctx, this.rand(0, CANVAS_WIDTH), this.rand(0, CANVAS_HEIGHT), (CANVAS_WIDTH - 50) / 2);
    this.round.push(e)
  };
}

/* ----- Round 1 -----*/

Game.prototype.initRound1 = function () {
    this.initRound(5, Bat )
}

Game.prototype.round1IsOver = function () {
  if (this.round.length === 0 && this.round1State === 0 && this.round2State === 0) {
    this.round1State = 1;
    return true
  }
}

/* ------ Round 2  ------*/

Game.prototype.initRound2 = function () {
  this.initRound(12, Shooter);
  this.round2State = 1;
  this.roundText(2)
}

Game.prototype.round2IsOver = function () {
  if (this.round.length === 0 && this.round1State === 1 && this.round2State === 1) {
    this.round2State = 2;
    return true
  }
}

/* ------ Round 3  ------*/

Game.prototype.initRound3 = function () {
  this.initRound(8, Wizzard);
  this.round3State = 1
  this.roundText(3)
}

Game.prototype.round3IsOver = function () {
  if (this.round.length === 0 && this.round2State === 2 && this.round3State === 1) {
    this.round3State = 2;
    return true
  }
}

/*----- Round 4 ------*/

Game.prototype.initRound4 = function () {
  this.initRound(1, Giant)
  this.round4State = 1
  this.roundText(4)
}

Game.prototype.round4IsOver = function () {
  if (this.round.length === 0 && this.round3State === 2 && this.round4State === 1) {
    this.round4State = 2;
    return true
  }
}

/*----- Round 5 ------*/

Game.prototype.initRound5 = function () {
  this.initRound(5, Skull)
  this.round5State = 1
  this.roundText(5)
}

Game.prototype.round5IsOver = function () {
  if (this.round.length === 0 && this.round4State === 2 && this.round5State === 1) {
    this.round5State = 2;
    this.roundText(6)
    return true
  }
}

/* ----- Round 6 -----*/

Game.prototype.initRound6 = function () {
  this.initRound(1, Cannon)
  this.initRound(5, SlaveJs)
  this.round6State = 1
}

Game.prototype.round6IsOver = function () {
  if (this.round.length === 0 && this.round5State === 2 && this.round6State === 1) {
    this.round6State = 2;
    this.roundText(7)
    return true
  }
}

/* ----- Round 7 -----*/

Game.prototype.initRound7 = function () {
  this.initRound(1, CannonCss)
  this.initRound(5, SkullFire)
  this.round7State = 1
}

Game.prototype.round7IsOver = function () {
  if (this.round.length === 0 && this.round6State === 2 && this.round7State === 1) {
    this.round7State = 2;
    this.roundText(8)
    return true
  }
}

/* ----- Round 8 -----*/

Game.prototype.initRound8 = function () {
  this.initRound(1, CannonHtml)
  this.initRound(5, SlaveHtml)
  this.round8State = 1
}

Game.prototype.round8IsOver = function () {
  if (this.round.length === 0 && this.round7State === 2 && this.round8State === 1) {
    this.round8State = 2;
    this.roundText(9)
    return true
  }
}

/* ----- Round 9 -----*/

Game.prototype.initRound9 = function () {
  this.initRound(1, Giant);
  this.initRound(3, Wizzard);
  this.initRound(1, Shooter);
  this.initRound(30, Bat);
  this.round9State = 1
}

Game.prototype.round9IsOver = function () {
  if (this.round.length === 0 && this.round7State === 2 && this.round9State === 1) {
    this.round9State = 2;
    return true
  }
}

/* ------ ITEMS ------ */

Game.prototype.addItem = function () {
  var random = this.rand(0, 10)
  this.round.forEach(enemy => {
    if (enemy.hit === 0 && random === 0) {
      var potion = new Potion(this.ctx, enemy.x, enemy.y)
      this.potions = this.potions.concat(potion);
      setTimeout(function () {
        var index = this.potions.indexOf(potion);
        this.potions.splice(index, 1);
      }.bind(this), 5000);
    } else if (enemy.hit === 0 && random === 1) {
      var superPower = new DobleSword(this.ctx, enemy.x, enemy.y)
      this.supers = this.supers.concat(superPower);
      setTimeout(function () {
        var index = this.supers.indexOf(superPower);
        this.supers.splice(index, 1);
      }.bind(this), 5000);
    } else if (enemy.hit === 0 && random >= 7 ) {
      var coin = new Coin(this.ctx, enemy.x, enemy.y)
      this.coins = this.coins.concat(coin);
      setTimeout(function () {
        var index = this.coins.indexOf(coin);
        this.coins.splice(index, 1);
      }.bind(this), 5000);
    }
  })
}

Game.prototype.helpItems = function (item1, item2) {
  this.potions.push(new item1(this.ctx, CANVAS_WIDTH / 2 + 50, CANVAS_HEIGHT / 2 ))
  this.potions.push(new item1(this.ctx, CANVAS_WIDTH / 2 + 100, CANVAS_HEIGHT / 2 ))
  this.potions.push(new item1(this.ctx, CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT / 2 ))
  this.supers.push(new item2(this.ctx, CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 ))
}

/*----- INTERACTIONS WITH ENEMIES ------*/

Game.prototype.deleteEnemies = function () {
  var newEnemyArray = this.round.filter(function (enemy) {
    return enemy.hit > 0;
  });
  var newBulletArray = this.player.fires.filter(function (bullet) {
    return bullet.hit < 1;
  })

  this.player.fires = newBulletArray;
  this.round = newEnemyArray;
}

Game.prototype.hitChanges = function (strength) {
  this.player.hits += strength;
  if (score > 0) {
    score -= 50
  }

  this.$hit.css("width", this.player.hits + '%');
  this.$heartLife.addClass('heart-hit')
  this.noHitTime = true;

  setTimeout(function () {
    this.$heartLife.removeClass('heart-hit')
    this.noHitTime = false;
  }.bind(this), 4000)
}

Game.prototype.addLive = function (live) {
  this.player.hits -= live;
  this.player.currentHits = this.player.hits;
  this.$hit.css("width", this.player.hits + '%');
}

/* ------ COLLISIONS ------- */

Game.prototype.enemyHit = function () {
  return this.round.some(function (enemy) {
    return this.player.fires.some(function (fire) {
      return fire.collideWith(enemy);
    }.bind(this))
  }.bind(this));
}

Game.prototype.playerHitContact = function () {
  return this.round.some(function (enemy) {
    return this.player.collideWith(enemy);
  }.bind(this));
}

Game.prototype.playerHitShoot = function () {
  return this.round.some(function (enemy) {
    return enemy.fires.some(function (fire) {
      return fire.collideWith(this.player);
    }.bind(this));
  }.bind(this));
}

/* ----- Collide player with items -----*/

Game.prototype.playerGetItem = function(array){
  var itemCollision = array.find(function (item) {
    return item.collideWith(this.player);
  }.bind(this))
  if (itemCollision) {
    var index = array.indexOf(itemCollision);
    array.splice(index, 1);
  }
  return itemCollision;
}

/* ----- EVENTS FUNCTIONS  ----- */

Game.prototype.mouseDown = function () {
  if(this.gameOn === true)
  this.player.fire();
}

Game.prototype.mouseMove = function (evt) {
  var mousePos = this.getMousePos(evt);
  this.mouseX = mousePos.x;
  this.mouseY = mousePos.y;
};

Game.prototype.onKeyEvent = function (event) {
  this.player.onKeyEvent(event);
};

Game.prototype.getMousePos = function (evt) {
  var rect = this.canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
};

/* ------- DRAW ------- */

Game.prototype.drawItems = function(array){
  for (var i = 0; i < array.length; i++) {
    array[i].draw();
  }
}

Game.prototype.drawRoundsInit = function(initRound){
    setTimeout(function () {
      initRound;
      this.player.fires = [];
    }.bind(this), 1500)
}

Game.prototype.draw = function () {
  this.drawIntervalCount++
  this.$scoreData.text(score)

  this.arena.draw()
  this.pointer.draw(this.mouseX, this.mouseY);

  this.addItem()
  this.deleteEnemies();
  this.enemyHit()

  if (this.playerHitShoot() && !this.noHitTime) {
    this.audioOuch.play()
    this.hitChanges(15)
  } else if (this.playerHitContact() && !this.noHitTime) {
    this.audioOuch.play()
    this.hitChanges(5)
  }

  if (this.playerGetItem(this.potions) && this.player.hits > 0) {
    this.addLive(5)
    this.audioPotion.play()
  } else if (this.playerGetItem(this.coins)) {
    score += 200
    this.audioCoin.play()
  } else if (this.playerGetItem(this.supers)) {
    this.player.super = true;
    this.audioPowerUp.play()
    setTimeout(function () {
      this.player.super = false;
    }.bind(this), 10000)
  }

  this.drawItems(this.potions);
  this.drawItems(this.supers);
  this.drawItems(this.coins);

  this.player.draw();
  this.player.update(this.mouseX, this.mouseY);


  this.round.forEach(el => {
    el.draw()
    el.update(this.player.x, this.player.y)
  })

  if (this.round1IsOver()) {
    this.drawRoundsInit(this.initRound2())
  } else if (this.round2IsOver()) {
    this.drawRoundsInit(this.initRound3())
  } else if (this.round3IsOver()) {
    this.helpItems(Potion, DobleSword)
    this.drawRoundsInit(this.initRound4())
  } else if (this.round4IsOver()) {
    this.drawRoundsInit(this.initRound5())
  } else if (this.round5IsOver()) {
    this.helpItems(Potion, DobleSword)
    this.drawRoundsInit(this.initRound6())
  } else if (this.round6IsOver()) {
    this.drawRoundsInit(this.initRound7())
  } else if (this.round7IsOver()) {
    this.drawRoundsInit(this.initRound8())
  } else if (this.round8IsOver()) {
    this.helpItems(Potion, DobleSword)
    this.player.fireInterval = 175;
    this.drawRoundsInit(this.initRound9())
  } else if (this.round9IsOver()) {
    this.youWin()
  }

  if (this.player.hits >= 100) {
    SPEED_MOVE = 0;
    SPEED_MOVE = 0;
    this.gameOver()
  }

  this.castle.draw()
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.start = function () {
  this.player.fires = [];
  this.audioBackground.play();
  this.audioBackground.volume = 0.3;
  this.intervalId = setInterval(function() {
    this.clear();
    this.draw();
  }.bind(this), DRAW_INTERVAL_MS)
  this.gameOn = true;
}
