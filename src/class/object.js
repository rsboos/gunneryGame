if (objects === undefined) {
  var objects = {};
}

objects.PhysicalElement = function PhysicalElement() {
  throw "Error - Abstract Class";
}

objects.PhysicalElement.prototype.init=function(color,isColider,type,coordinates) {
	
	console.log(color);
  this.color=color;
  this.isColider = isColider;
  this.type = type;
  this.coordinates = coordinates.slice();
  this.top = this.coordinates[1];
  this.bottom = this.coordinates[1] + this.coordinates[3];
  this.left = this.coordinates[0];
  this.right = this.coordinates[0] + this.coordinates[2];
}

objects.PhysicalElement.prototype.render=function(ctx) { // polimorfismo por inclusao
  ctx.fillStyle = this.color;
  ctx.fillRect(this.coordinates[0],this.coordinates[1],this.coordinates[2],this.coordinates[3]);
}


