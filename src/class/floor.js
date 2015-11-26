if (objects === undefined)
  var objects = {};

objects.Floor = function Floor(color,isColider,type,coordinates) {
    this.init("img/floorbackground.png",isColider,type,coordinates);
}

objects.Floor.prototype = Object.create(objects.PhysicalElement.prototype);

objects.Floor.prototype.isColided = function(position) {
  var x = position[0];
  var y = position[1];
  var width = position[2];
  var height = position[3];
  return ((x + width > this.left)  && (x < this.right) && (y + height -10 > this.top) && y < this.bottom);
}