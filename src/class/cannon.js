if (objects === undefined)
  var objects = {};

objects.Cannon = function Cannon(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
   
}
objects.Cannon.prototype = Object.create(objects.PhysicalElement.prototype);
