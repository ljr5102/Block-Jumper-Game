

$(function(){

  var Game = function() {
    this.el = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    var that = this;
    this.el.addEventListener("click", this.startGame.bind(this));
    window.addEventListener("keydown", this.jump.bind(this), false);
  };

  Game.prototype.startGame = function() {
    this.thing = new Thing();
    this.plat = new Platform();
    this.obs = new Obstacle();
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

  Game.prototype.checkForCollision = function() {
    if (this.obs.posX <= this.thing.posX + this.thing.width && this.obs.posY <= this.thing.posY + this.thing.height) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.jump = function(time) {
    if (!this.jumpStartTime) {
      this.jumpStartTime = time.timeStamp;
      window.requestAnimationFrame(this.jump.bind(this));
    } else {
      var delta = (time - this.jumpStartTime) / 10;
      this.jumpStartTime = time;
      // this.ctx.clearRect(this.thing.posX, this.thing.posY, this.thing.width, this.thing.height);
      this.thing.posY = this.thing.posY - (this.thing.yVel / delta);
      this.thing.yVel = this.thing.yVel - (0.81)*(delta / 100);
      if (this.thing.posY > 500) {
        // this.ctx.clearRect(this.thing.posX, 500, this.thing.width, this.thing.height);
        this.thing.yVel = 2;
        this.thing.posY = 500;
        // this.ctx.fillRect(this.thing.posX, this.thing.posY, this.thing.width, this.thing.height);
        this.jumpStartTime = null;
        return;
      }
      this.draw();
      // this.ctx.fillRect(this.thing.posX, this.thing.posY, this.thing.width, this.thing.height);
      window.requestAnimationFrame(this.jump.bind(this));
    }
  };

  Game.prototype.moveObs = function(time) {
    var delta = (time - this.startTime) / 10;
    this.startTime = time;
    this.obs.posX = this.obs.posX - (this.obs.speed / delta);
    this.draw();
    this.checkForCollision();
    if (this.checkForCollision()) {
      // this.jump();
      window.removeEventListener('keydown', this.jump.bind(this));
    } else {
      window.requestAnimationFrame(this.moveObs.bind(this));
    }
  };

  var newGame = new Game();

});
