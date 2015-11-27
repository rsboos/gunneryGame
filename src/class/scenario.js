if (objects === undefined)
  var objects = {};

objects.Scenario = function Scenario(background,isColider,type,coordinates) {
    this.init(background,isColider,type,coordinates);
}

objects.Scenario.prototype = Object.create(objects.PhysicalElement.prototype);
