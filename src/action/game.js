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
	var scenarioObj = new objects.Scenario("#0000FF",false, "square", [0,0,width,height]);
	var floorObj = new objects.Floor("#00FF00",true, "square", [0,height-70,width,70]);
	Fort1 = new objects.Fortress("#8B4513",true, "square", [15,floorObj.top-50+10,50,50],0);
	Fort2 = new objects.Fortress("#8B4513",true, "square", [width-15-50,floorObj.top-50+10,50,50],1);
	//var floorObj = new objects.Floor("#00FF00",true, "square", [0,height-70,width,70]);
	elements.push(scenarioObj);
	elements.push(Fort1);
	elements.push(Fort2);
	elements.push(floorObj);
	

	
	console.log(elements);
	var board = new gameSpace.Board().init(width,height,"gameCanvas",elements);
	//console.log(board.width);
	board.getContext();
	var step = function() 
	{
		board.renderAll();
		requestAnimationFrame(step);
	};

	board.animate(step);
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	step();
	var lastKey = 0;
	var timeBefore = 0;
	console.log(this);


	var repeater;
		
	
	var match = this;
	var cannonElem, enemyFort;
	document.addEventListener('keydown', function(e) 
	{
		var i;
		for (i=0; i < board.elements.length; i++)
			if (board.elements[i] instanceof objects.Fortress && board.elements[i].player == match.WhoPlays) // explicar que da certo porque faz curto circuito
				cannonElem = board.elements[i].cannon;
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
        			repeater = setInterval(function () {
			var d = new Date();
	    	var timeNow = d.getTime();
		  if ((timeNow < timeBefore + 1500)) {
		    $("#forceBar")[0].value = Math.min(timeNow-timeBefore,1500);
		  } else {
		  	clearInterval(repeater);
		  	//$("#forceBar")[0].value = 0;
		  	// $("#forceBar")[0].value = 0;
		    
		  }
		}, 16);        			
    			}
        	}
		lastKey = e.which; 
	}, false);

	var shootDone = false;
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
	  		shootDone=true;
	        
	        velocity = timeAfter - timeBefore;
	        velocity = Math.min(1500,velocity);
	        console.log("Key pressed for "+velocity.toString()+" units of time.");
	        var ball = new objects.Ball("img/ball.png",true,"circle",[cannonElem.right - cannonElem.width*match.WhoPlays,cannonElem.top,5]);
	        board.elements.push(ball);
	        console.log(board);
	        var hit = board.elements[board.elements.length-1].fire(velocity,cannonElem.getDegrees(),match.WhoPlays,board.elements);
	        hit.then(function(result) {
	        	hitReady[Math.abs(match.WhoPlays-1)] = true;
	        	board.elements.pop();
	        	if (result) { // hit other player
	        		if (lastGot[match.WhoPlays] == 0) {
	        			lastGot[match.WhoPlays]++;
	        		}
	        		else if (lastGot[match.WhoPlays] == 1) {
	        			
	        			console.log("transforming to special");
	        			lastGot[match.WhoPlays]++;
	        			myFort.cannon = new objects.CannonSpecial("img/baseCannon.png",false,"square",[myFort.left,myFort.top-40,50,40],myFort.player);
	        			myFort.cannon.setCannonImg("img/cannonSpecial.png");
	        			//active Special
	        		}
	        		else if (lastGot[match.WhoPlays] == 2)  {
	        			console.log("going back to normal");
	        			myFort.cannon = new objects.Cannon("img/baseCannon.png",false,"square",[myFort.left,myFort.top-40,50,40],myFort.player);
	        			lastGot[match.WhoPlays] = 0;
	        		}
	        		var damage = cannonElem.getDamageLevel();
 					if(match.WhoPlays == 0) {
 						//myFort = new SpecialFort();
 						match.healthPlayer2-=damage;
 						enemyFort.setTop(enemyFort.top+Math.min(10*damage,50));
 						$("#vidaJogador1").val(match.healthPlayer2);	
 					}
 					else {
 						enemyFort.setTop(enemyFort.top+Math.min(10*damage,50));
 						match.healthPlayer1-=damage;
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
 			else
 				lastGot[match.WhoPlays]=0;
 			lastKey=0;
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