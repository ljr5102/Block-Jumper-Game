$(function(){

  var Game = function() {
    this.el = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.el.addEventListener("click", this.startGame.bind(this));
  };

  Game.prototype.startGame = function() {
    this.ctx.fillRect(20, 30, 40, 50);
    this.el.removeEventListener('click', this.startGame.bind(this));
  };

  var newGame = new Game();

});
