if (objects === undefined)
  var objects = {};

objects.Scenario = function Scenario(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
   
}
objects.Scenario.prototype = Object.create(objects.PhysicalElement.prototype);
