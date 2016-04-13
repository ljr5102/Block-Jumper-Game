var Ball = function() {
  this.type = "Ball";
  this.posX = 350;
  this.posY = 330;
  this.startAngle = 0,
  this.endAngle = 2*Math.PI;
  this.radius = 20;
  this.yVel = 0;
  this.markForRemoval = false;
};

Ball.prototype.draw = function(ctx) {
  ctx.fillStyle = "blue";
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

Ball.prototype.checkForAerialCollision = function(aerObj) {
  if (this.yVel > 0) {
    var farX = this.posX + this.radius;
    var nearX = this.posX - this.radius;
    var lowY = this.posY + this.radius;
    if (farX > aerObj.posX && nearX < aerObj.posX + aerObj.width) {
      if (lowY > aerObj.posY && lowY < aerObj.posY + 50) {
        this.yVel = -1.5;
      }
    }
  }
  // else if (this.yVel === 0) {
  //   if (this.yPos < 330) {
  //
  //   }
  // }
};

Ball.prototype.isCollidedWith = function(obj2) {
  switch (obj2.type) {
    case "Platform":
    if(this.posY + this.radius > obj2.posY) {
      this.posY = obj2.posY - this.radius;
      this.yVel = 0;
    }
      break;
    case "Aerial":
      this.checkForAerialCollision(obj2);
      break;
  }
};
