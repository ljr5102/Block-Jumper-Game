window.addEventListener("DOMContentLoaded", function(){

  var Game = function() {
    this.el = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.renderIntroScreen();
    this.score = 0;
    this.level = 1;
    this.tick = 0;
    this.runningClock = 0;
    this.el.addEventListener("touchstart", this.startGame.bind(this), false);
    this.el.addEventListener("click", this.startGame.bind(this), false);
    this.el.addEventListener("touchstart", this.handleTouchEvent.bind(this), false);
    this.el.addEventListener("click", this.handleClickEvent.bind(this), false);
    window.addEventListener("keydown", this.startGame.bind(this), false);
    window.addEventListener("keydown", this.handleKeyEvent.bind(this), false);
  };

  Game.prototype.renderIntroScreen = function() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "italic "+60+"pt Arial Black";
    this.ctx.fillText("COW JUMPER", 40, 200);
    var high = window.localStorage.highscore;
    if (high) {
      this.ctx.font = "italic "+40+"pt Arial Black";
      this.ctx.fillText("High Score: " + high, 40,260);
    }
    this.ctx.font = "italic " +20+"pt Arial Black";
    this.ctx.fillText("Click anywhere to begin!", 40, 300);
  };

  Game.prototype.startGame = function(e) {
    if (e.type === "keydown" && e.keyCode !== 32) {
      return;
    }
    e.preventDefault();
    if (!this.started) {
      this.started = true;
      this.gameJustStarted = true;
      this.initializeGameObjects();
      this.draw();
      this.lastTime = 0;
      window.requestAnimationFrame(this.startAnimation.bind(this));
    }
  };

  Game.prototype.initializeGameObjects = function() {
    this.ball = new Ball();
    this.plat = new Platform();
    this.generateObstacles();
    this.generateAerials();
    this.allCurrentObjects = [this.ball, this.plat, this.obstacles.shift()];
  };

  Game.prototype.generateObstacles = function() {
    this.obstacles = [];
    for(var i = 0; i < 10; i++) {
      var obstc = Obstacle.createRandomObstacles(this.level);
      this.obstacles.push(obstc);
    }
  };

  Game.prototype.generateAerials = function() {
    this.aerials = [];
    for (var i = 0; i < 10; i++) {
      var aer = Aerial.createRandomAerials(i);
      this.aerials.push(aer);
    }
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, 800, 400);
    this.ctx.fillStyle = "black";
    this.ctx.font = "normal "+12+"pt Arial Black";
    this.ctx.fillText("Score: " + this.score, 10,30);
    if (this.runningClock > 0 && this.runningClock < 50) {
      this.ctx.font = "normal "+12+"pt Arial Black";
      this.ctx.fillText("Click or Press Spacebar to Jump", 220, 250);
    }
    if (window.localStorage.highscore) {
      this.ctx.fillText("High: " + window.localStorage.highscore, 10,50);
    }
    for(var i = 0; i < this.allCurrentObjects.length; i++) {
      var obj = this.allCurrentObjects[i];
      obj.draw(this.ctx);
    }
  };

  Game.prototype.handleKeyEvent = function(e) {
    if (this.started && !this.gameJustStarted && e.keyCode === 32) {
      this.ball.jump();
    }
  };

  Game.prototype.handleClickEvent = function() {
    if (this.started && !this.gameJustStarted) {
      this.ball.jump();
    }
  };

  Game.prototype.handleTouchEvent = function(e) {
    e.preventDefault();
    if (this.started && !this.gameJustStarted) {
      this.ball.jump();
    }
  };

  Game.prototype.checkOutOfBounds = function() {
    for (var i = 0; i < this.allCurrentObjects.length; i++) {
      var currObj = this.allCurrentObjects[i];
      switch (currObj.type) {
        case "Obstacle":
          if (currObj.posX + currObj.width < 0) {
            this.score += 1;
            this.allCurrentObjects[i] = this.obstacles.shift();
          }
        break;
        case "Aerial":
          if (currObj.posX + currObj.width < 0) {
            this.allCurrentObjects.splice(i, 1);
            i -= 1;
          }
        break;
      }
    }
  };

  Game.prototype.pushInAerials = function() {
    if (this.tick === 100 && this.aerials.length > 0) {
      this.allCurrentObjects.push(this.aerials.shift());
      this.tick = 0;
    } else if (this.aerials.length === 0) {
      this.generateAerials();
      this.tick = 99;
    }
  };

  Game.prototype.renderGameOver = function() {
    this.draw();
    this.ctx.fillStyle = "black";
    this.ctx.font = "bold "+36+"pt Arial Black";
    this.ctx.fillText("YOU HIT A COW!", 220,150);
    this.ctx.font = "bold "+20+"pt Arial Black";
    this.ctx.fillText("Click or Press Space to retry", 230, 200);
    if (window.localStorage.highscore) {
      var highInt = parseInt(window.localStorage.highscore);
      if (this.score > highInt) {
        window.localStorage.setItem("highscore", this.score);
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold "+24+"pt Arial Black";
        this.ctx.fillText("NEW HIGH SCORE: " + this.score, 260,240);
      }
    } else {
        window.localStorage.setItem("highscore", this.score);
    }
    var highScore = window.localStorage.highscore;
    this.score = 0;
    this.level = 1;
    this.tick = 0;
    this.runningClock = 0;
    this.started = false;
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.allCurrentObjects.length; i++) {
      var obj1 = this.allCurrentObjects[i];
      for (var j = 0; j < this.allCurrentObjects.length; j++) {
        var obj2 = this.allCurrentObjects[j];
        if (i === j) {

        } else {
          obj1.isCollidedWith(obj2);
        }
      }
    }
  };

  Game.prototype.checkForRemovals = function() {
    for (var i = 0; i < this.allCurrentObjects.length; i++) {
      var currObj = this.allCurrentObjects[i];
      if (currObj.markForRemoval) {
        this.allCurrentObjects.splice(i, 1);
        i -= 1;
      }
    }
  };

  Game.prototype.gameOver = function() {
    if (this.obstacles.length === 0) {
      this.level += 1;
      this.generateObstacles();
    } else {
      for (var i = 0; i < this.allCurrentObjects.length; i++) {
        if (this.allCurrentObjects[i].type === "Obstacle") {
          return this.allCurrentObjects[i].collision;
        }
      }
    }
  };

  Game.prototype.step = function(delta) {
    this.tick += 1;
    this.runningClock += 1;
    if (this.runningClock === 1) {
      this.gameJustStarted = false;
    }
    for(var i = 0; i < this.allCurrentObjects.length; i++) {
      var obj = this.allCurrentObjects[i];
      obj.move(delta);
    }
    this.checkOutOfBounds();
    this.pushInAerials();
    this.checkCollisions();
    this.checkForRemovals();
  };


  Game.prototype.startAnimation = function(time) {
    var delta = time - this.lastTime;
    this.step(delta);
    this.draw();
    this.lastTime = time;
    if (!this.gameOver()) {
      window.requestAnimationFrame(this.startAnimation.bind(this));
    } else {
      this.renderGameOver();
    }
  };

  var newGame = new Game();

});
