$(function(){

  var Game = function() {
    this.el = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    var that = this;
    window.addEventListener("keydown", this.handleKeyEvent.bind(this));
    this.el.addEventListener("click", this.startGame.bind(this));
  };

  Game.prototype.startGame = function() {
    this.thing = new Thing();
    this.plat = new Platform();
    // this.generateObstacles();
    this.obs = new Obstacle();
    this.obstacles = [this.obs];
    this.keyPresses = [];
    this.keyPressed = false;
    this.objects = [this.thing, this.plat, this.obs];
    this.draw();
    this.el.removeEventListener('click', this.startGame.bind(this));
    this.startTime = 0;
    this.startPos = 0;
    window.requestAnimationFrame(this.moveObs.bind(this));
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, 800, 600);
    for(var i = 0; i < this.objects.length; i++) {
      var obj = this.objects[i];
      this.ctx.fillRect(obj.posX, obj.posY, obj.width, obj.height);
    }
  };

  // Game.prototype.checkForCollision = function() {
  //   Math.floor(this.obs.width / 2) + Math.floor(this.thing.width / 2)
  //   if (this.obs.posX <= this.thing.posX + this.thing.width && this.obs.posY <= this.thing.posY + this.thing.height) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  Game.prototype.handleKeyEvent = function(e) {
    // this.keyPresses.push(e.keyCode);
    if (!this.keyPressed) {
      this.jump(e.timeStamp);
    }
  };

  Game.prototype.checkObstaclePositions = function() {
    for (var i = 0; i < this.obstacles.length; i++) {
      if (this.obstacles[i].posX + this.obstacles[i].width < 0) {
        this.obstacles.splice(i, 1);
        this.objects.pop();
        i -= 1;
      }
    }
    console.log(this.obstacles.length);
  };

  Game.prototype.jump = function(time) {
    this.keyPressed = true;
    if (!this.jumpStartTime) {
      this.jumpStartTime = time;
      window.requestAnimationFrame(this.jump.bind(this));
    } else {
      var delta = (time - this.jumpStartTime) / 10;
      this.jumpStartTime = time;
      // this.ctx.clearRect(this.thing.posX, this.thing.posY, this.thing.width, this.thing.height);
      this.thing.posY = this.thing.posY - (this.thing.yVel * delta);
      this.thing.yVel = this.thing.yVel - (0.81)*(delta / 100);
      if (this.thing.posY > 500) {
        this.thing.yVel = 2;
        this.thing.posY = 500;
        this.jumpStartTime = null;
        this.keyPressed = false;
      } else {
        // this.ctx.fillRect(this.thing.posX, this.thing.posY, this.thing.width, this.thing.height);
        window.requestAnimationFrame(this.jump.bind(this));
      }
    }
  };

  Game.prototype.moveObs = function(time) {
    // this.checkForCollision();
    if (this.obstacles.length !== 0) {
      var obs = this.obstacles[0];
      var delta = (time - this.startTime) / 10;
      this.startTime = time;
      obs.posX = obs.posX - (obs.speed / delta);
      this.checkObstaclePositions();
    } else {
      var newOb = new Obstacle();
      this.obstacles.push(newOb);
      this.objects.push(newOb);
      this.startTime = 0;
      this.draw();
    }
    this.draw();
    window.requestAnimationFrame(this.moveObs.bind(this));
    // if (this.checkForCollision()) {
    //   // this.jump();
    //   debugger
    //   window.removeEventListener('keydown', this.jump.bind(this));
    // } else {
    //   window.requestAnimationFrame(this.moveObs.bind(this));
    // }
  };

  var newGame = new Game();

});
