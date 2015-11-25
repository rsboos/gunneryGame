if (objects === undefined) {
  var objects = {};
}

objects.PhysicalElement = function PhysicalElement() {
  throw "Error - Abstract Class";
}

objects.PhysicalElement.prototype.init=function(color,isColider,type,coordinates) {
  this.color=color;
  this.isColider = isColider;
  this.type = type;
  this.coordinates = coordinates;
}

objects.PhysicalElement.prototype.render=function() { // polimorfismo por inclusao
    context.fillStyle(this.color);
    context.fillRect(this.coordinates[0],this.coordinates[1],this.coordinates[2],this.coordinates[4]);
}



