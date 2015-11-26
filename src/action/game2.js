if (gameSpace === undefined)
  var gameSpace = {};

gameSpace.Match = function Match() 
{

}

gameSpace.Match.prototype.init=function() 
{

	this.lifesAvailable=5;
	this.WhoPlays=0;
	this.healthPlayer1=this.lifesAvailable;
	this.healthPlayer2=this.lifesAvailable;
	this.objectElements = [];
	return this;
}

gameSpace.Match.prototype.initLifes=function(numberOfLifes) 
{
	this.lifesAvailable=numberOfLifes;
	this.WhoPlays=0;
	this.healthPlayer1=this.lifesAvailable;
	this.healthPlayer2=this.lifesAvailable;
	this.objectElements = [];
	return this;
}

gameSpace.Match.prototype.isFinished=function() 
{
	return ((this.healthPlayer1 == 0) || (this.healthPlayer2 == 0));
}

gameSpace.Match.prototype.doRound= function() 
{
	if (this.WhoPlays == 0)
		enemy = 1;
	else
		enemy = 0;
}

gameSpace.Match.prototype.startMatch = function() 
{
	width = 800;
	height = 400;
	var elements = []; // this array contains information about all elements
	var scenarioObj = new objects.Scenario("#0000FF",false, "square", [0,0,width,height]);
	var floorObj = new objects.Floor("#00FF00",true, "square", [0,height-70,width,70]);
	var Fort = [];
	Fort.push(new objects.Fortress("#8B4513",false, "square", [15,floorObj.top-50,50,50],0))
	Fort.push(new objects.Fortress("#8B4513",false, "square", [width-15-50,floorObj.top-50,50,50],1));
	var floorObj = new objects.Floor("#00FF00",false, "square", [0,height-70,width,70]);
	elements.push(scenarioObj);
	elements.push(floorObj);
	elements.push(Fort);

	
	console.log(elements);
	var board = new gameSpace.Board().init(width,height,"gameCanvas",elements);
	//console.log(board.width);
	var step = function() 
	{
		board.renderAll();
		board.animate(step);
	};

	board.animate(step);
	
	var lastKey = 0;
	var timeBefore;
	console.log(this);

	var match = this;
	
	document.addEventListener('keydown', function(e) 
	{
		arrayNroRounds.push(1);
		var i;
		var cannonElem;
		for (i=0; i < board.elements.length; i++)
			if (board.elements[i] instanceof Array)
				if (board.elements[i][0] instanceof objects.Fortress)
					cannonElem = board.elements[i][match.WhoPlays].cannon;

		if (e.which==38) // UP
    		cannonElem.makeRotation(-1);
		    else if (e.which==40) // DOWN
    			cannonElem.makeRotation(1);
        	else if (e.which == 32) 
        	{ // SPACE
            	if (lastKey != 32) 
            	{
        			console.log("first key down SPACE");
        			var d = new Date();
        			timeBefore = d.getTime();
    			}
        	}
		lastKey = e.which; 
	}, false);

	var shootDone = false;
		
	document.addEventListener('keyup', function(e) 
	{
	    if (e.which == 32) 
	    { // SPACE
	  		for (i=0; i < board.elements.length; i++)
				if (board.elements[i] instanceof Array)
					if (board.elements[i][0] instanceof objects.Fortress)
						cannonElem = board.elements[i][match.WhoPlays].cannon;
	  		shootDone=true;
	        var d = new Date();
	        var timeAfter = d.getTime();
	        velocity = timeAfter - timeBefore;
	        velocity = Math.min(1500,velocity);
	        console.log("Key pressed for "+velocity.toString()+" units of time.");
	        var ball = new objects.Ball("#FFFFFF",true,"circle",[cannonElem.left,cannonElem.top,5]);
	        board.elements.push(ball);
	        console.log(board);
	        var hit = board.elements[board.elements.length-1].fire(velocity,cannonElem.getDegrees(),match.WhoPlays);
	        hit.then(function(result) {

	        	board.elements.pop();
	        	if (result) {
 					if(match.WhoPlays == 0) {
 						match.healthPlayer2--;
 						$("#vidaJogador1").val(match.healthPlayer2);
 						
 					}
 					else {
 						match.healthPlayer1--;
 						$("#vidaJogador0").val(match.healthPlayer1);
 						
 					}
 				if (match.isFinished()) {
 					if (match.healthPlayer1 == 0)
						var nomeGanhador = nomeJogadorDois;
					else
						var nomeGanhador = nomeJogadorUm;

					alert("Fim de jogo!");
					$("#divVida").remove();
					$("#divJogo").remove();
					$("#gameCanvas").remove();
					var soma = somaNroRounds(arrayNroRounds);
					$("#divFinalJogo").show();
					$("#divFinalJogo").html("<center><h1>" + nomeGanhador + " venceu o jogo!" + "</h1><br /><b>Número de rounds: </b>" + soma + "</center>");
				}
 			}
 			match.WhoPlays =Math.abs(match.WhoPlays-1);
 			console.log(match.WhoPlays);

	        });
		}
	}, false);

	var html = '<div style="display:inline-block; margin-left: 5px;"><progress id="vidaJogador0" value=' + this.lifesAvailable + ' max=' + this.lifesAvailable + '></progress></div>';
	var html2 = '<div style="display:inline-block; margin-left: 450px;"><progress id="vidaJogador1" value=' + this.lifesAvailable + ' max=' + this.lifesAvailable + '></progress></div>';
	html = html + html2;
	$("#divVida").html(html);

	var arrayNroRounds = [];
}

function somaNroRounds(array)
{
	if (array.length == 1)
		return array.pop();
	else
		return array.pop() + somaNroRounds(array);
}