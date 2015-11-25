if (objects === undefined)
  var objects = {};

objects.Ball = function Ball(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
   	this.radius = 1;
}
objects.Ball.prototype = Object.create(objects.PhysicalElement.prototype);

objects.Bqll.prototype.render = function(context) {
	context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.left, this.top, this.radius, 2 * Math.PI,false);
    context.fill();
}
