var Obstacle = function(speed, width, height, fill) {
  this.type = "Obstacle";
  this.posX = 800;
  this.posY = 350 - 50;
  this.width = 50;
  this.height = 50;
  this.speed = speed;
  this.fill = fill;
  this.collision = false;
  this.markForRemoval = false;
};

Obstacle.createRandomObstacles = function(level) {
  var speed;
  var obstc;
  var widths;
  var heights;
  var random1;
  var random2;
  var src2 = "http://res.freestockphotos.biz/pictures/10/10675-illustration-of-a-cartoon-cow-pv.png";
  var colors = ["red", "orange", "black"];
  var random3 = Math.floor(Math.random() * (3)) + 0;
  var color = colors[random3];
  if(level === 1 || level === 2) {
    widths = [20, 25, 30];
    heights = [40, 45, 50];
    random1 = Math.floor(Math.random() * (3)) + 0;
    random2 = Math.floor(Math.random() * (3)) + 0;
    speed = Math.floor(Math.random() * (51)) + 100;
    obstc = new Obstacle(speed, widths[random1], heights[random2], color);
    return obstc;
  }
  if(level === 3 || level === 4) {
    widths = [30, 35, 40];
    heights = [45, 50, 55];
    random1 = Math.floor(Math.random() * (3)) + 0;
    random2 = Math.floor(Math.random() * (3)) + 0;
    speed = Math.floor(Math.random() * (71)) + 120;
    obstc = new Obstacle(speed, widths[random1], heights[random2], color);
    return obstc;
  }
  if(level === 5 || level === 6) {
    widths = [35, 40, 45];
    heights = [50, 55, 60];
    random1 = Math.floor(Math.random() * (3)) + 0;
    random2 = Math.floor(Math.random() * (3)) + 0;
    speed = Math.floor(Math.random() * (91)) + 140;
    obstc = new Obstacle(speed, widths[random1], heights[random2], color);
    return obstc;
  }
};

Obstacle.prototype.draw = function(ctx) {
  var img = new Image();
  img.src = "http://res.freestockphotos.biz/pictures/10/10675-illustration-of-a-cartoon-cow-pv.png";
  ctx.fillStyle = this.fill;
  ctx.drawImage(img, this.posX, this.posY, this.width, this.height);
  // ctx.fillRect(this.posX, this.posY, this.width, this.height);
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
