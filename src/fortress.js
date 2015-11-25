if (objects === undefined)
  var objects = {};

objects.Fortress = function Fortress(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
    this.cannon=haveCannon;
}
objects.Fortress.prototype = Object.create(objects.PhysicalElement.prototype);
