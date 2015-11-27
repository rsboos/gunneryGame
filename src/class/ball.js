if (objects === undefined)
  var objects = {};

objects.Ball = function Ball(background,isColider,type,coordinates) {
    this.init(background,isColider,type,coordinates);
   	this.initialX = coordinates[0];
   	this.initialY = coordinates[1];
}
objects.Ball.prototype = Object.create(objects.PhysicalElement.prototype);

objects.Ball.prototype.render = function(context) {
  context.save();
  context.translate(this.left, this.top);

  context.drawImage(this.background,0,0,17,17);
  context.restore();  
}

objects.Ball.prototype.fire = function(initVelocity,angle,curPlayer,elements) {
	var index=1;
	var vInit=initVelocity/15;
    vInit = Math.min(100,vInit);
    var theta = Math.abs(angle)*Math.PI/180.0;
    var vInity = vInit*Math.sin(theta);
    var vInitx = vInit*Math.cos(theta);
    var a=-9.8;
    if (curPlayer == 1)
    	vInitx=-vInitx;
    var yPos,xPos;

  function isColiderTest(element) {
      if (element instanceof objects.Ball)
        return false;
      else
        return element.isColider;
    }

  var colisionElements  = elements.filter(isColiderTest);
         console.log("Filtered Value : " );
         console.log(colisionElements);
         
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
  function isCol(elem) {
    return elem.isColided([that.left,that.top,17,17]);
  }
  var colidedNow = colisionElements.filter(isCol);
	index++;
        if (colidedNow.length > 0) {
          var i;
          for (i=0; i < colidedNow.length; i++) {
            if (colidedNow[i] instanceof objects.Fortress) {
              if (colidedNow[i].player != curPlayer)
                deferred.resolve(true);
              else
                deferred.resolve(false);
            }
            else
              deferred.resolve(false); 
          }
        }
        else if ((that.left < 0) || (that.left > 800))  {
          deferred.resolve(false);  
        }
        else {
            setTimeout(advance, 8);
        }
 	};
	advance();
  return deferred.promise();
}
