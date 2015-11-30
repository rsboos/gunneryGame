if (objects === undefined) {
  var objects = {};
}

objects.PhysicalElement = function PhysicalElement() {
  throw "Error - Abstract Class";

}

objects.PhysicalElement.prototype.init=function(background,isColider,type,coordinates) {
    
  this.isColider = isColider;
  this.type = type;
  this.coordinates = coordinates.slice();
  this.top = this.coordinates[1];
  this.left = this.coordinates[0];
  if (this.coordinates.length == 4) {  
    this.bottom = this.coordinates[1] + this.coordinates[3];
    this.right = this.coordinates[0] + this.coordinates[2];
    this.width = coordinates[2];
    this.height = coordinates[3];
  }
  if (background.length == 7)
    this.background=background;
  else {
    var myImage = new Image();
    myImage.src = background; 
    this.background = myImage;
  }
}

objects.PhysicalElement.prototype.render=function(ctx) { // polimorfismo por inclusao
  ctx.save();

  if (this.background instanceof Image) {
     ctx.translate(this.left, this.top);
    ctx.drawImage(this.background,0,0);
    }
  else {
     ctx.fillStyle = this.background;
      ctx.translate(this.left, this.top);
  ctx.fillRect(0,0,this.width,this.height);
  }
 
  ctx.restore();

}



