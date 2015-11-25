if (gameSpace === undefined)
  var gameSpace = {};

gameSpace.Board = function Board() {
}

gameSpace.Board.prototype.init=function(width,height,canvasID,elements) {

	console.log("board");
	
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
	//console.log($("#"+this.canvasID)[0]);
	return $("#"+this.canvasID)[0].getContext('2d');
}

gameSpace.Board.prototype.renderAll=function() {
	context=this.getContext();
	context.fillStyle = "#0000FF";
    context.fillRect(0, 0, 800, this.height);
	
}