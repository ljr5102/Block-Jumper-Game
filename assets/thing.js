var Thing = function() {
  this.posX = 20;
  this.posY = 500;
  this.width = 40;
  this.height = 50;
  this.yVel = 2;
};

var Platform = function() {
  this.posX = 0;
  this.posY = 550;
  this.width = 800;
  this.height = 50;
};

var Obstacle = function() {
  this.posX = 800;
  this.posY = 510;
  this.width = 20;
  this.height = 40;
  this.speed = Math.random() * 10;
};
