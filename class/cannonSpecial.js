if (objects === undefined)
  var objects = {};

objects.CannonSpecial = function CannonSpecial(background,isColider,type,coordinates,player) {
    this.init(background,isColider,type,coordinates,player);
    this.degrees = 0;
    this.player=player;
    var myImage = new Image();
    myImage.src = "img/cannon.png";
    this.cannonImg = myImage;

}
objects.CannonSpecial.prototype = Object.create(objects.Cannon.prototype);
objects.CannonSpecial.prototype.constructor = objects.Fortress;
objects.CannonSpecial.prototype.setCannonImg = function(path) {
  var myImage = new Image();
    myImage.src = path;
  this.cannonImg = myImage;
}

objects.CannonSpecial.prototype.getDamageLevel = function() {
  return Math.floor(Math.random() * 4);
}