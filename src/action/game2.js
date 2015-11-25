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

	var curPlayer = this.WhoPlays;

	match = this;
	
	document.addEventListener('keydown', function(e) 
	{
		var i;
		var cannonElem;
		for (i=0; i < board.elements.length; i++)
			if (board.elements[i] instanceof Array)
				if (board.elements[i][0] instanceof objects.Fortress)
					cannonElem = board.elements[i][curPlayer].cannon;

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
						cannonElem = board.elements[i][curPlayer].cannon;
	  		
	  		shootDone=true;
	        var d = new Date();
	        var timeAfter = d.getTime();
	        velocity = timeAfter - timeBefore;
	        velocity = Math.min(1500,velocity);
	        console.log("Key pressed for "+velocity.toString()+" units of time.");
	        var ball = new objects.Ball("#FFFFFF",true,"circle",[cannonElem.left,cannonElem.top,5]);
	        board.elements.push(ball);
	        console.log(board);
	        hit = board.elements[board.elements.length-1].fire(velocity,cannonElem.getDegrees(),curPlayer);
	        hit = true;
			if (hit) 
			{
				board.elements.pop();
				if (curPlayer == 0) 
				{
					match.healthPlayer2 = match.healthPlayer2- 1;
					$("#vidaJogador1").val(match.healthPlayer2);
				}
				else
				{
					match.healthPlayer1 = match.healthPlayer1 - 1;
					$("#vidaJogador0").val(match.healthPlayer1);
				}

				if (match.isFinished())
				{
					if (match.healthPlayer1 == 0)
						var nomeGanhador = nomeJogadorDois;
					else
						var nomeGanhador = nomeJogadorUm;

					alert("Fim de jogo!");
						$("#divVida").remove();
						$("#gameCanvas").remove();
						$("#divFinalJogo").show();
						$("#divFinalJogo").html("<center><h1>" + nomeGanhador + " venceu o jogo!" + "</h1></center>");
				}

				curPlayer = Math.abs(curPlayer-1);
			}
			else 
			{
				console.log(board);
				//board.elements.pop();
				curPlayer = Math.abs(curPlayer-1);
			}				
			
			
			console.log(curPlayer);

		}
	}, false);

	var html = '<table><td><progress id="vidaJogador0" value=' + this.lifesAvailable + ' max=' + this.lifesAvailable + '></progress></td>';
	var html2 = '<td><progress id="vidaJogador1" value=' + this.lifesAvailable + ' max=' + this.lifesAvailable + '></progress></td>';
	var html3 = '<tr><td><button onclick="diminuirVida(0)">Diminuir Vida!</button></td><td><button onclick="diminuirVida(1)">Diminuir Vida!</button></td></tr></table>';
	html = html + html2 + html3;
	$("#divVida").html(html);

	var match;
}