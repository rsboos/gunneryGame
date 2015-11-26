if (objects === undefined)
  var objects = {};

objects.Ball = function Ball(color,isColider,type,coordinates) {
    this.init(color,isColider,type,coordinates);
   	this.radius = coordinates[2];
   	this.initialX = coordinates[0];
   	this.initialY = coordinates[1];
}
objects.Ball.prototype = Object.create(objects.PhysicalElement.prototype);

objects.Ball.prototype.render = function(context) {
	//console.log("rendering ball ");
	context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.left, this.top, this.radius, 2 * Math.PI,false);
    context.fill();
}

objects.Ball.prototype.fire = function(initVelocity,angle,player) {
	var index=1;
	var vInit=initVelocity/15;
    vInit = Math.min(100,vInit);
    var theta = Math.abs(angle)*Math.PI/180.0;
    var vInity = vInit*Math.sin(theta);
    var vInitx = vInit*Math.cos(theta);
    var a=-9.8;
    if (player == 1)
    	vInitx=-vInitx;
    var yPos,xPos;

 	var that = this;
  var deferred = $.Deferred();
 	var advance = function () {
     	var time = index/20;
	that.left = that.initialX+4*vInitx*time;
	that.top = that.initialY-4*vInity*time-4*0.5*a*time*time;
	console.log("Top: "+that.top.toString()+" Left: "+that.left.toString());
	yPos = vInity*time+0.5*a*time*time;
	xPos = Math.abs(vInitx*time);
	//sleep(16);
	index++;
        if ((that.top > 330) || (xPos < 0) || (xPos > width)) {
	      deferred.resolve(true);         
        }
        else {
            setTimeout(advance, 8);
        }
 	};
	advance();
  return deferred.promise();
}
