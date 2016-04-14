$(function(){

  var Game = function() {
    this.el = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.renderIntroScreen();
    this.score = 0;
    this.level = 1;
    this.tick = 0;
    this.el.addEventListener("click", this.startGame.bind(this));
  };

  Game.prototype.renderIntroScreen = function() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "italic "+60+"pt Arial Black";
    this.ctx.fillText("COW JUMPER", 40,200);
    var high = window.localStorage.highscore;
    if (high) {
      this.ctx.font = "italic "+40+"pt Arial Black";
      this.ctx.fillText("High Score: " + high, 40,260);
    }
  };

  Game.prototype.startGame = function() {
    this.initializeGameObjects();
    document.getElementById('current-score').innerHTML = "Current Score: " + this.score;
    window.addEventListener("keydown", this.handleKeyEvent.bind(this));
    this.draw();
    this.lastTime = 0;
    window.requestAnimationFrame(this.startAnimation.bind(this));
  };

  Game.prototype.initializeGameObjects = function() {
    this.ball = new Ball();
    this.plat = new Platform();
    this.generateObstacles();
    this.generateAerials();
    // this.currentObstacle = this.obstacles.shift();
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
    for(var i = 0; i < this.allCurrentObjects.length; i++) {
      var obj = this.allCurrentObjects[i];
      obj.draw(this.ctx);
    }
  };

  Game.prototype.handleKeyEvent = function(e) {
    this.ball.jump();
  };

  // Game.prototype.removeExitedObstacle = function() {
  //   for (var i = 0; i < this.allCurrentObjects.length; i++) {
  //     var currObj = this.allCurrentObjects[i];
  //     if(currObj.type === "Obstacle") {
  //       this.allCurrentObjects.splice(i, 1);
  //       return;
  //     }
  //   }
  // };

  Game.prototype.checkOutOfBounds = function() {
    for (var i = 0; i < this.allCurrentObjects.length; i++) {
      var currObj = this.allCurrentObjects[i];
      switch (currObj.type) {
        case "Obstacle":
          if (currObj.posX + currObj.width < 0) {
            this.score += 1;
            document.getElementById('current-score').innerHTML = "Current Score: " + this.score;
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
    // if (this.currentObstacle.posX + this.currentObstacle.width < 0) {
    //   this.currentObstacle = this.obstacles.shift();
    //   this.score += 1;
    //   document.getElementById('current-score').innerHTML = "Current Score: " + this.score;
    //   this.removeExitedObstacle();
    //   this.allCurrentObjects.push(this.currentObstacle);
    // }
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
    if (window.localStorage.highscore) {
      var highInt = parseInt(window.localStorage.highscore);
      if (this.score > highInt) {
        window.localStorage.setItem("highscore", this.score);
      }
    } else {
        window.localStorage.setItem("highscore", this.score);
    }
    // document.getElementById('current-score').innerHTML = "You Win!";
    var highScore = window.localStorage.highscore;
    // document.getElementById('high-score').innerHTML = "Your high score: " + highScore;
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
      if (this.level === 6) {
        return true;
      } else {
        this.level += 1;
        this.generateObstacles();
      }
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
    for(var i = 0; i < this.allCurrentObjects.length; i++) {
      var obj = this.allCurrentObjects[i];
      obj.move(delta);
    }
    this.checkOutOfBounds();
    this.pushInAerials();
    this.checkCollisions();
    this.checkForRemovals();
    // this.gameOver();
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
