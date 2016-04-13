$(function(){

  var Game = function() {
    this.el = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.score = 0;
    this.level = 1;
    this.el.addEventListener("click", this.startGame.bind(this));
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
    this.aerials = [];
    this.generateAerials();
    this.currentObstacle = this.obstacles.shift();
    this.allCurrentObjects = [this.ball, this.plat, this.currentObstacle, this.aerials[0]];
  };

  Game.prototype.generateObstacles = function() {
    this.obstacles = [];
    for(var i = 0; i < 10; i++) {
      var obstc = Obstacle.createRandomObstacles(this.level);
      this.obstacles.push(obstc);
    }
  };

  Game.prototype.generateAerials = function() {
    if (this.aerials.length < 1) {
      var aer = Aerial.createRandomAerials();
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

  Game.prototype.removeExitedObstacle = function() {
    for (var i = 0; i < this.allCurrentObjects.length; i++) {
      var currObj = this.allCurrentObjects[i];
      if(currObj.type === "Obstacle") {
        this.allCurrentObjects.splice(i, 1);
        return;
      }
    }
  };

  Game.prototype.checkObstaclePosition = function() {
    if (this.currentObstacle.posX + this.currentObstacle.width < 0) {
      this.currentObstacle = this.obstacles.shift();
      this.score += 1;
      document.getElementById('current-score').innerHTML = "Current Score: " + this.score;
      this.removeExitedObstacle();
      this.allCurrentObjects.push(this.currentObstacle);
    }
  };

  Game.prototype.pushInAerials = function() {
    this.generateAerials();
    this.allCurrentObjects.concat(this.aerials);
  };

  Game.prototype.renderGameOver = function() {
    this.draw();
    document.getElementById('current-score').innerHTML = "You Win!";
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

  Game.prototype.gameOver = function() {
    if (this.obstacles.length === 0) {
      if (this.level === 2) {
        return true;
      } else {
        this.level += 1;
        this.generateObstacles();
      }
    } else {
      return this.currentObstacle.collision;
    }
  };

  Game.prototype.step = function(delta) {
    for(var i = 0; i < this.allCurrentObjects.length; i++) {
      var obj = this.allCurrentObjects[i];
      obj.move(delta);
    }
    this.checkObstaclePosition();
    this.pushInAerials();
    this.checkCollisions();
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
