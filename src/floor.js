if (objects === undefined)
  var objects = {};

objects.Floor = function Floor(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
}

objects.Floor.prototype = Object.create(objects.PhysicalElement.prototype);
