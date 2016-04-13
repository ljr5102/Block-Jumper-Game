var Ball = function() {
  this.type = "Ball";
  this.posX = 30;
  this.posY = 330;
  this.startAngle = 0,
  this.endAngle = 2*Math.PI;
  this.radius = 20;
  this.yVel = 0;
};

Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.posX, this.posY, this.radius, this.startAngle, this.endAngle);
  ctx.fill();
};

Ball.prototype.hitGround = function() {
  return this.posY + this.radius > 350;
};

Ball.prototype.move = function(delta) {
  this.posY = this.posY + (this.yVel * delta);
  if(this.yVel !== 0) {
    this.yVel = this.yVel + (9.8)*(delta / 1000);
  }
};

Ball.prototype.jump = function(time) {
  if (this.yVel === 0) {
    this.yVel = -2;
  }
};

Ball.prototype.isCollidedWith = function(obj2) {
  if(obj2.type === "Platform") {
    if(this.posY + this.radius > obj2.posY) {
      this.posY = obj2.posY - this.radius;
      this.yVel = 0;
    }
  }
};
