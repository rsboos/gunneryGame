if (objects === undefined)
  var objects = {};

objects.Cannon = function Cannon(color,isColider,type,coordinates,player) {
    this.init(color,isColider,type,coordinates);
   	this.degrees = 0;
   	this.player=player;
}
objects.Cannon.prototype = Object.create(objects.PhysicalElement.prototype);

objects.Cannon.prototype.render = function(context) {
	context.save(); 
    context.fillStyle = "#000000";
    context.translate( this.left + this.width/2, this.top + this.height/2 );
    if (this.player == 0)
    	context.rotate(this.degrees*Math.PI/180);
    if (this.player == 1)
    	context.rotate(-this.degrees*Math.PI/180);
    context.translate(-this.width/2, -this.height/2);
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
}

objects.Cannon.prototype.makeRotation = function(degrees) {
	console.log("rotating");
	ret = Math.abs(degrees+this.degrees);
	ret=Math.max(0,ret);
	ret=Math.min(90,ret);
	this.degrees = -ret;
}
