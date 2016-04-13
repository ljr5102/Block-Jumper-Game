var Obstacle = function() {
  this.type = "Obstacle";
  this.posX = 800;
  this.posY = 310;
  this.width = 20;
  this.height = 40;
  this.speed = 200;
  this.collision = false;
};

Obstacle.prototype.draw = function(ctx) {
  ctx.fillRect(this.posX, this.posY, this.width, this.height);
};

Obstacle.prototype.move = function(delta) {
  this.posX = this.posX - (this.speed / delta);
};

Obstacle.prototype.isCollidedWith = function(obj2) {
  if (obj2.type === "Ball") {
    if (this.posY > obj2.posY + obj2.radius) {
      return false;
    } else {
      if (this.posX > (obj2.posX - obj2.radius) && this.posX < (obj2.posX + obj2.radius)) {
        this.collision = true;
      }
    }
    return false;
  }
  // return;
};
