if (objects === undefined)
  var objects = {};

objects.Fortress = function Fortress(color,isColider,type,coordinates,player) {
    this.init(color,isColider,type,coordinates);
    cannonHeight = 20;
    cannonWidth = 30;
    var cannonLeft;
    this.player = player;
    (player == 0) ? cannonLeft = this.left + 50 -cannonWidth/2 : cannonLeft = this.left - cannonWidth/2;
    this.cannon = new objects.Cannon("#000000",false,"square",[cannonLeft,this.top-cannonHeight,cannonWidth,cannonHeight],player);
    console.log(this.cannon);
}


objects.Fortress.prototype = Object.create(objects.PhysicalElement.prototype);

objects.Fortress.prototype.render = function(ctx) {
	//console.log("rendering fortress");
	ctx.fillStyle = this.color;
  	ctx.fillRect(this.coordinates[0],this.coordinates[1],this.coordinates[2],this.coordinates[3]);
	this.cannon.render(ctx);
}

objects.Fortress.prototype.isColided = function(position) {
  var x = position[0];
  var y = position[1];
  return (x > this.left && x < this.right && y > this.top && y < this.bottom);
}