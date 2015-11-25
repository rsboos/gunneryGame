	if (gameSpace === undefined)
	  var gameSpace = {};

	gameSpace.Match = function Match() {
	}

	gameSpace.Match.prototype.init=function() {

	  this.lifesAvailable=5;
	  this.WhoPlays=1;
	  this.healthPlayer1=this.lifesAvailable;
	  this.healthPlayer2=this.lifesAvailable;
	  this.objectElements = [];
	  return this;
	}
	gameSpace.Match.prototype.initLifes=function(numberOfLifes) {
	  this.lifesAvailable=numberOfLifes;
	  this.WhoPlays=1;
	  this.healthPlayer1=this.lifesAvailable;
	  this.healthPlayer2=this.lifesAvailable;
	  this.objectElements = [];
	  return this;
	}

	gameSpace.Match.prototype.isFinished=function() {
		return ((this.healthPlayer1 == 0) || (this.healthPlayer2 == 0));
	}

	gameSpace.Match.prototype.doRound= function() {
		if (this.whoPlays == 0)
			enemy = 1;
		else
			enemy = 0;
		
		var lastKey = 0;
		var timeBefore;
		var shootDone = false;
			
			renderAll();

			document.addEventListener('keydown', function(e) {
				if (e.which==38) // UP
	        		this.elements.Fort[this.whoPlays].Cannon.rotate(-1);
	   		    else if (e.which==40) // DOWN
	        		this.elements.Fort[this.whoPlays].Cannon.rotate(1);
	            else if (e.which == 32) { // SPACE
	                if (lastKey != 32) {
	            		console.log("first key down SPACE");
	            		var d = new Date();
	            		timeBefore = d.getTime();
	        		}
	            }
	    		lastKey = e.which; }, false);

			
			document.addEventListener('keydown', function(e) {
		  		    if (e.which == 32) { // SPACE
		  		    	shootDone=true;
		        		var d = new Date();
		        		var timeAfter = d.getTime();
		        		velocity = timeAfter - timeBefore;
		        		velocity = Math.min(1500,velocity);
		        		console.log("Key pressed for "+timePressed.toString()+" units of time. Now "+turn.toString()+" plays.");
		        		hit = elements.Ball.fire(velocity,whoPlays);
		        		
						if (hit) {
							healthPlayer[enemy]--;
							if (this.isFinished()) {
								renderGameOver();
							}
							this.whoPlays = enemy;
						}
						else
							this.whoPlays = enemy;
						console.log(this.whoPlays);
					}
				}, false);
	}

	gameSpace.Match.prototype.startMatch = function() {
		width = 800;
		height = 400;
		var elements = []; // this array contains information about all elements
		var scenarioObj = new objects.Scenario("#0000FF",false, "square", [0,0,width,height]);
		var floorObj = new objects.Floor("#00FF00",false, "square", [0,height/4,width,height/4]);
		elements.push(scenarioObj);
		elements.push(floorObj);
		
		console.log(elements);
		var board = new gameSpace.Board().init(width,height,"gameCanvas",elements);
		//console.log(board.width);
		var step = function() {
			board.renderAll();
			board.animate(step);
		};
		//board.animate(step);
		$( document ).ready(function() {
		board.renderAll();
		});
		console.log("player "+this.WhoPlays.toString()+ " turn!");

	}

	var currentGame = new gameSpace.Match().initLifes(10);

	currentGame.startMatch();