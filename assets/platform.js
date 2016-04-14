var Platform = function() {
  this.type = "Platform";
  this.posX = 0;
  this.posY = 350;
  this.width = 800;
  this.height = 50;
  this.markForRemoval = false;
};

Platform.prototype.draw = function(ctx) {
  var img = new Image();   // Create new img element
  img.src = 'http://us.123rf.com/450wm/punphoto/punphoto1203/punphoto120300222/12930005-green-grass-texture.jpg?ver=6'
  ctx.fillStyle = 'green';
  ctx.drawImage(img, this.posX, this.posY, this.width, this.height);
  // ctx.fillRect(this.posX, this.posY, this.width, this.height);
};

Platform.prototype.move = function(delta) {
  return;
};

Platform.prototype.isCollidedWith = function(obj2) {
  return;
};
