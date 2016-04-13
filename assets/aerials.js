var Aerial = function() {
  this.type = "Aerial";
  this.posX = 800;
  this.posY = 200;
  this.width = 100;
  this.height = 50;
  this.speed = 100;
};

Aerial.createRandomAerials = function() {
  var newAer = new Aerial();
  return newAer;
};

Aerial.prototype.draw = function(ctx) {
  ctx.fillRect(this.posX, this.posY, this.width, this.height);
};

Aerial.prototype.move = function(delta) {
  this.posX = this.posX - (this.speed / delta);
};

Aerial.prototype.isCollidedWith = function(obj2) {
  return;
};
