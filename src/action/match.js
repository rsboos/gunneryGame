if (gameSpace === undefined)
  var gameSpace = {};

gameSpace.Match = function Match() {

}

gameSpace.Match.prototype.init=function() 
{
	this.lifesAvailable=5;
	this.WhoPlays=0;
	this.healthPlayer1=this.lifesAvailable;
	this.healthPlayer2=this.lifesAvailable;
	return this;
}

gameSpace.Match.prototype.initLifes=function(numberOfLifes) 
{
	this.lifesAvailable=numberOfLifes;
	this.WhoPlays=0;
	this.healthPlayer1=this.lifesAvailable;
	this.healthPlayer2=this.lifesAvailable;
	return this;
}

gameSpace.Match.prototype.isFinished=function() 
{
	return ((this.healthPlayer1 <= 0) || (this.healthPlayer2 <= 0));
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
	var scenarioObj = new objects.Scenario("img/bgScenario.png",false, "square", [0,0,width,height]);
	var floorObj = new objects.Floor("img/floorbackground.png",true, "square", [0,height-70,width,70]);
	Fort1 = new objects.Fortress("img/fort.png",true, "square", [15,floorObj.top-40,50,50],0);
	Fort2 = new objects.Fortress("img/fort.png",true, "square", [width-15-50,floorObj.top-40,50,50],1);
	elements.push(scenarioObj);
	elements.push(Fort1);
	elements.push(Fort2);
	elements.push(floorObj);
	
	var board = new gameSpace.Board().init(width,height,"gameCanvas",elements);
	var renderFrame = function() 
	{
		board.renderAll();
		requestAnimationFrame(renderFrame);
	};
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	renderFrame();

	var lastKey = 0;
	var timeBefore = 0;
	var repeater;
	
	var cannonElem;
	var enemyFort;
	var match = this;
	document.addEventListener('keydown', function(e) 
	{
		var i;
		for (i=0; i < board.elements.length; i++) {
			if (board.elements[i] instanceof objects.Fortress && board.elements[i].player == match.WhoPlays) { // explicar que da certo porque faz curto circuito
				cannonElem = board.elements[i].cannon;
			}
		}
			if (e.which==38) // UP
    			cannonElem.makeRotation(-1);
		    else if (e.which==40) // DOWN
    			cannonElem.makeRotation(1);
        	else if (e.which == 32) 
        	{ // SPACE
            	if (lastKey != 32) // assign time of start pressing space
            	{
        			var d = new Date();
        			timeBefore = d.getTime();
        			repeater = setInterval(function () {
			var d = new Date();
	    	var timeNow = d.getTime();
		  if ((timeNow < timeBefore + 1500)) {
		    $("#forceBar")[0].value = Math.min(timeNow-timeBefore,1500);
		  } else {
		  	clearInterval(repeater);		    
		  }
		}, 16);        			
    			}
        	}
		lastKey = e.which; 
	}, false);

	var hitReady = [true,false];
	var lastGot = [0,0];
	
	document.addEventListener('keyup', function(e) 
	{
	    if (e.which == 32 && hitReady[match.WhoPlays]) 
	    { // SPACE
	    	clearInterval(repeater);
	    	$("#forceBar")[0].value = 0;
	    	var d = new Date();
	    	var timeAfter = d.getTime();
	    	hitReady[match.WhoPlays]=false;
	    	arrayNroRounds.push(1);
	  		for (i=0; i < board.elements.length; i++) {
				if (board.elements[i] instanceof objects.Fortress && board.elements[i].player == match.WhoPlays) {
					cannonElem = board.elements[i].cannon;
					myFort = board.elements[i];
				}	
				else if (board.elements[i] instanceof objects.Fortress && board.elements[i].player != match.WhoPlays) {
					enemyFort = board.elements[i];
				}									
	  		}	        
	        velocity = timeAfter - timeBefore;
	        velocity = Math.min(1500,velocity);
	        var ball = new objects.Ball("img/ball.png",true,"square",[cannonElem.right - cannonElem.width*match.WhoPlays,cannonElem.top,5]);
	        board.elements.push(ball);
	        var hit = board.elements[board.elements.length-1].fire(velocity,cannonElem.getDegrees(),match.WhoPlays,board.elements);
	        hit.then(function(result) {
	        	hitReady[Math.abs(match.WhoPlays-1)] = true;
	        	board.elements.pop();
	        	if (result) { // hit other player
	        		if (lastGot[match.WhoPlays] == 0) {
	        			lastGot[match.WhoPlays]++;
	        		}
	        		else if (lastGot[match.WhoPlays] == 1) {
	        			lastGot[match.WhoPlays]++;
	        			myFort.cannon = new objects.CannonSpecial("img/baseCannon.png",false,"square",[myFort.left,myFort.top-40,50,40],myFort.player);
	        			myFort.cannon.setCannonImg("img/cannonSpecial.png");

	        		}
	        		else if (lastGot[match.WhoPlays] == 2)  {
	        			myFort.cannon = new objects.Cannon("img/baseCannon.png",false,"square",[myFort.left,myFort.top-40,50,40],myFort.player);
	        			lastGot[match.WhoPlays] = 0;
	        		}
	        		var damage = cannonElem.getDamageLevel();
 					if(match.WhoPlays == 0) {
 						match.healthPlayer2-=damage;
 						enemyFort.setTop(enemyFort.top+Math.min(10*damage,50));
 						$("#lifePlayer2").val(match.healthPlayer2);	
 					}
 					else {
 						enemyFort.setTop(enemyFort.top+Math.min(10*damage,50));
 						match.healthPlayer1-=damage;
 						$("#lifePlayer1").val(match.healthPlayer1);
 					}
 				if (match.isFinished()) {
 					var nomeGanhador;
 					if (match.healthPlayer1 <= 0)
						nomeGanhador = $("#namePlayer2").text();
					else
						nomeGanhador = $("#namePlayer1").text();
					$('#wrapper').empty();
					var soma = somaNroRounds(arrayNroRounds);
					$("#wrapper").html("<center><h1>" + nomeGanhador + " venceu o jogo!" + "</h1><br /><b>Número de rounds: </b>" + soma + "</center>");
					$("#infoDiv").hide();
 				}
 			}
 			else
 			lastGot[match.WhoPlays]=0;
 			lastKey=0;
 			match.WhoPlays =Math.abs(match.WhoPlays-1);
	        });
		}
	}, false);
	var arrayNroRounds = [];
}

function somaNroRounds(array)
{
	if (array.length == 1)
		return array.pop();
	else
		return array.pop() + somaNroRounds(array);
}