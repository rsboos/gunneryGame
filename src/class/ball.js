if (objects === undefined)
  var objects = {};

objects.Ball = function Ball(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
   
}
objects.Ball.prototype = Object.create(objects.PhysicalElement.prototype);
