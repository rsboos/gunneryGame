if (objects === undefined)
  var objects = {};

objects.Cannon = function Cannon(background,isColider,type,coordinates,player) {
    this.init(background,isColider,type,coordinates);
    this.degrees = 0;
    this.player=player;
    var myImage = new Image();
    myImage.src = "img/cannon.png";
    this.cannonImg = myImage;
}
objects.Cannon.prototype = Object.create(objects.PhysicalElement.prototype);
objects.Cannon.prototype.constructor = objects.Cannon;

objects.Cannon.prototype.init=function(background,isColider,type,coordinates,player) {
this.isColider = isColider;
  this.type = type;
  this.coordinates = coordinates.slice();
  this.top = this.coordinates[1];
  this.left = this.coordinates[0];
  if (this.coordinates.length == 4) {  
    this.bottom = this.coordinates[1] + this.coordinates[3];
    this.right = this.coordinates[0] + this.coordinates[2];
    this.width = coordinates[2];
    this.height = coordinates[3];
  }
  if (background.length == 7)
    this.background=background;
  else {
    var myImage = new Image();
    myImage.src = background; 
    this.background = myImage;
  }
  
}

objects.Cannon.prototype.render = function(context) {
	context.save(); 
    context.translate( this.left , this.top  );
    
    context.drawImage(this.background,0,0,this.width,this.height);
     context.translate( -8 , -8   );
    context.translate( 35 , 17   );
    context.rotate(180*this.player*Math.PI/180);
    if (this.player == 0)
      context.rotate(this.degrees*Math.PI/180);
    if (this.player == 1)
      context.rotate(-this.degrees*Math.PI/180);
    context.drawImage(this.cannonImg,-35/2, -17/2);

    context.restore();
}

objects.Cannon.prototype.makeRotation = function(degrees) {
	ret = Math.abs(degrees+this.degrees);
	ret=Math.max(0,ret);
	ret=Math.min(90,ret);
	this.degrees = -ret;
}

objects.Cannon.prototype.getDegrees = function() {
	return this.degrees;
}

objects.Cannon.prototype.getDamageLevel = function() {
  return 1;
}

