var Ball = function() {
  this.type = "Ball";
  this.posX = 30;
  this.posY = 330;
  this.startAngle = 0,
  this.endAngle = 2*Math.PI;
  this.radius = 20;
  this.yVel = -4;
};

Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.posX, this.posY, this.radius, this.startAngle, this.endAngle);
  ctx.fill();
};

Ball.prototype.hitGround = function() {
  return this.posY + this.radius > 350;
};
