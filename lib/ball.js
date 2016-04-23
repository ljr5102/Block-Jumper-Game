var Ball = function() {
  this.type = "Ball";
  this.posX = 327;
  this.posY = 304;
  this.startAngle = 0,
  this.endAngle = 2*Math.PI;
  this.radius = 23;
  this.yVel = 0;
  this.markForRemoval = false;
};

Ball.prototype.draw = function(ctx) {
  var img = new Image();
  img.src = "assets/images/pig_picture.png";
  ctx.fillStyle = this.fill;
  ctx.drawImage(img, (this.posX), (this.posY), (this.radius * 2), (this.radius * 2));
};

Ball.prototype.hitGround = function() {
  return this.posY + (this.radius * 2) > 350;
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
    var farX = this.posX + (this.radius * 2);
    var nearX = this.posX;
    var lowY = this.posY + (this.radius * 2);
    if (farX > aerObj.posX && nearX < aerObj.posX + aerObj.width) {
      if (lowY > aerObj.posY && lowY < aerObj.posY + 50) {
        this.yVel = -1.5;
      }
    }
  }
};

Ball.prototype.isCollidedWith = function(obj2) {
  switch (obj2.type) {
    case "Platform":
    if(this.posY + (this.radius * 2) > obj2.posY) {
      this.posY = obj2.posY - (this.radius * 2);
      this.yVel = 0;
    }
      break;
    case "Aerial":
      this.checkForAerialCollision(obj2);
      break;
  }
};
