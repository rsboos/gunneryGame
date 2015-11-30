  if (gameSpace === undefined)
    var gameSpace = {};

  gameSpace.Board = function Board() {
  }

  gameSpace.Board.prototype.init=function(width,height,canvasID,elements) {
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

  }).appendTo('#wrapper');
    $("#"+canvasID)[0].width = width;
      $("#"+canvasID)[0].height = height;
  });
    this.elements = elements;
      return this;
  }

  gameSpace.Board.prototype.getContext=function() {
   return $("#"+this.canvasID)[0].getContext('2d');
  }

  gameSpace.Board.prototype.renderAll=function() {
    var i;
    ctx = this.getContext();
    ctx.clearRect(0, 0, this.width, this.height);
    for (i=0; i < this.elements.length; i++) {
      this.elements[i].render(ctx);
    }

    
  }
