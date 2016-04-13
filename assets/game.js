$(function(){

  var Game = function() {
    this.el = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    var that = this;
    window.addEventListener("keydown", this.handleKeyEvent.bind(this));
    this.el.addEventListener("click", this.startGame.bind(this));
  };

  Game.prototype.startGame = function() {
    this.initializeGame();
    this.keyPressed = false;
    this.jumpStartTime = false;
    this.draw();
    this.el.removeEventListener('click', this.startGame.bind(this));
    this.startTime = 0;
    window.requestAnimationFrame(this.moveObs.bind(this));
  };

  Game.prototype.initializeGame = function() {
    this.ball = new Ball();
    this.plat = new Platform();
    this.generateObstacles();
    this.currentObstacle = this.obstacles.shift();
    this.allCurrentObjects = [this.ball, this.plat, this.currentObstacle];
  };

  Game.prototype.generateObstacles = function() {
    this.obstacles = [];
    for(var i = 0; i < 10; i++) {
      console.log(this.obstacles.length);
      this.obstacles.push(new Obstacle());
    }
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, 800, 600);
    for(var i = 0; i < this.allCurrentObjects.length; i++) {
      var obj = this.allCurrentObjects[i];
      obj.draw(this.ctx);
    }
  };

  Game.prototype.handleKeyEvent = function(e) {
    // this.keyPresses.push(e.keyCode);
    if (!this.keyPressed) {
      this.keyPressed = true;
      window.requestAnimationFrame(this.jump.bind(this));
    }
  };

  Game.prototype.jump = function(time) {
    if (!this.jumpStartTime) {
      this.jumpStartTime = time;
    } else {
      var delta = (time - this.jumpStartTime) / 10;
      this.jumpStartTime = time;
      this.ball.posY = this.ball.posY + (this.ball.yVel * delta);
      this.ball.yVel = this.ball.yVel + (9.8)*(delta / 100);
    }
    if(this.ball.hitGround()) {
      this.ball.posY = 530;
      this.ball.yVel = -4;
      this.jumpStartTime = false;
      this.keyPressed = false;
      return;
    }
    window.requestAnimationFrame(this.jump.bind(this));
  };


  Game.prototype.checkObstaclePosition = function() {
    if (this.currentObstacle.posX + this.currentObstacle.width < 0) {
      this.currentObstacle = this.obstacles.shift();
      this.allCurrentObjects.pop();
      this.allCurrentObjects.push(this.currentObstacle);
    }
  };

  Game.prototype.moveObs = function(time) {
    if (this.obstacles.length !== 0) {
      var delta = (time - this.startTime) / 10;
      this.startTime = time;
      this.currentObstacle.posX = this.currentObstacle.posX - (this.currentObstacle.speed / delta);
      if(this.currentObstacle.isCollidedWith(this.ball)) {
        return;
      }
      this.checkObstaclePosition();
    } else {
      return;
    }
    this.draw();
    window.requestAnimationFrame(this.moveObs.bind(this));
  };

  var newGame = new Game();

});
