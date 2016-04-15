var Aerial = function(posY, speed) {
  this.type = "Aerial";
  this.posX = 800;
  this.posY = posY;
  this.width = 100;
  this.height = 30;
  this.speed = speed;
  this.markForRemoval = false;
};

Aerial.createRandomAerials = function() {
  var potentPositions = [150, 175, 200];
  var speeds = [50, 100, 150];
  var random1 = Math.floor(Math.random() * (3)) + 0;
  var random2 = Math.floor(Math.random() * (3)) + 0;
  var newAer = new Aerial(potentPositions[random1], speeds[random2]);
  return newAer;
};

Aerial.prototype.draw = function(ctx) {
  var img = new Image();
  img.src = "images/cloud_picture.png";
  ctx.fillStyle = "gray";
  ctx.drawImage(img, this.posX, this.posY, this.width, this.height);
};

Aerial.prototype.move = function(delta) {
  this.posX = this.posX - (this.speed / delta);
};

Aerial.prototype.checkSelfCollision = function(otherAer) {
  if (this.posY === otherAer.posY) {
    var minX = this.posX <= otherAer.posX ? this : otherAer;
    var maxX = minX === this ? otherAer : this;
    return minX.posX + minX.width >= maxX.posX;
  } else {
    return false;
  }
};

Aerial.prototype.isCollidedWith = function(obj2) {
  return;
};
