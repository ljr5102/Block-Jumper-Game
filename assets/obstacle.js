var Obstacle = function() {
  this.type = "Obstacle";
  this.posX = 800;
  this.posY = 510;
  this.width = 20;
  this.height = 40;
  this.speed = Math.random()*20 + 10;
};

Obstacle.prototype.draw = function(ctx) {
  ctx.fillRect(this.posX, this.posY, this.width, this.height);
};

Obstacle.prototype.isCollidedWith = function(ball) {
  if (this.posY > ball.posY + ball.radius) {
    return false;
  } else {
    if (this.posX > (ball.posX - ball.radius) && this.posX < (ball.posX + ball.radius)) {
      return true;
    }
  }
  return false;
};
