if (objects === undefined)
  var objects = {};

objects.Floor = function Floor(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
}

objects.Floor.prototype = Object.create(objects.PhysicalElement.prototype);

objects.Floor.prototype.isColided = function(position) {
  var x = position[0];
  var y = position[1];
  return (x > this.left && x < this.right && y > this.top && y < this.bottom);
}