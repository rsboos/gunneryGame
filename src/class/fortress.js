if (objects === undefined)
  var objects = {};

objects.Fortress = function Fortress(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
    this.cannon=true;
}
objects.Fortress.prototype = Object.create(objects.PhysicalElement.prototype);
