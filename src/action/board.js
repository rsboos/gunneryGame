  if (gameSpace === undefined)
    var gameSpace = {};

  gameSpace.Board = function Board() {
  }

  gameSpace.Board.prototype.init=function(width,height,canvasID,elements) {

  	//console.log("board");
  	
    this.width= width;
    this.height = height;
    this.canvasID = canvasID;
    var elementID = canvasID; // Unique ID
    $( document ).ready(function() {
    $('<canvas>').attr({
      id: elementID
  }).css({
      width: width + 'px',
      height: height + 'px'
  }).appendTo('body');

  });
    this.elements = elements;
      return this;
  }

  gameSpace.Board.prototype.animate = function (callback) {  window.setTimeout(callback, 1000 / 60)   };

  gameSpace.Board.prototype.getContext=function() {
  	return $("#"+this.canvasID)[0].getContext('2d');
  }

  gameSpace.Board.prototype.renderAll=function() {
    var i;
    ctx = $("#"+this.canvasID)[0].getContext('2d');
    console.log(ctx);
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(0,0,400,100);
    for (i=0; i < this.elements.length; i++) {
      
     // console.log("rendering "+i.toString());
     // this.elements[i].render(ctx);
    }
  
  }