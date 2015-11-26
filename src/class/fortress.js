if (objects === undefined)
  var objects = {};

objects.Fortress = function Fortress(color,isColider,type,coordinates,player) {
    this.init("img/fort.png",isColider,type,coordinates);
    cannonHeight = 40;
    cannonWidth = 50;
    var cannonLeft;
    this.player = player;
    (player == 0) ? cannonLeft = this.left: cannonLeft = this.left;
    this.cannon = new objects.Cannon("img/baseCannon.png",false,"square",[cannonLeft,this.top-cannonHeight+10,cannonWidth,cannonHeight],player);
    console.log(this.cannon);
}


objects.Fortress.prototype = Object.create(objects.PhysicalElement.prototype);


objects.Fortress.prototype.render = function(ctx) {
  this.cannon.render(ctx);
	  ctx.save();

  if (this.color instanceof Image) {
     ctx.translate(this.left, this.top);
    ctx.drawImage(this.color,0,0,this.width,this.height);
    }
  else {
     ctx.fillStyle = this.color;
      ctx.translate(this.left, this.top);
  ctx.fillRect(0,0,this.width,this.height);
  }
 
  ctx.restore();
	
}

objects.Fortress.prototype.setTop = function(num) {
  this.top = num;
  this.cannon.top = this.top - 30;
}

objects.Fortress.prototype.isColided = function(position) {
  var x = position[0];
  var y = position[1];
  var width = position[2];
  var height = position[3];
  return ((x + width > this.left)  && (x < this.right) && (y + height > this.top) && y < this.bottom);
}