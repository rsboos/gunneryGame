var game = {} || game; // namespace game;


game.match = function Match() {

}


console.log("alter1");

window.onload=function(){

var board = document.createElement("canvas");
var width = 800;
var height = 400;
board.width = width;
board.height = height;
var context = board.getContext('2d');
//var player1 = new Fortress();
//var player2 = new Fortress();
//var scenario = new Scenario();
//var floor = new Floor();

renderScenario = function RendScenario() {
    //console.log("rendering scenario");
    context.fillStyle = "#0000FF";
    context.fillRect(0, 0, width, height);
    
};

renderFortress = function Rend() {
    //console.log("rendering fortress");
    context.fillStyle = "#8B4513";
    context.fillRect(10, height-70-50, 50, 50);
    context.fillStyle = "#8B4513";
    context.fillRect(10, height-70-50, 50, 50);
};

renderFortress2 = function Rend() {
    //console.log("rendering fortress");
    context.fillStyle = "#8B4513";
    context.fillRect(width-10-50, height-70-50, 50, 50);
};

renderFloor = function Rend() {
    //console.log("render floor");
    context.fillStyle = "#00FF00";
    context.fillRect(0, height-70, width, 70);
}

renderCannon = function Rend(degrees) {
    context.save();
    //console.log("render cannon");
    context.fillStyle = "#000000";
    context.translate( 35 + 15, height-70-50-20+10 );
    context.rotate(degrees*Math.PI/180);
    context.translate( -15, -10 );
    context.fillRect(0, 0, 30, 20);
    context.restore();

};

renderCannon2 = function Rend(degrees) {
    context.save();
    //console.log("render cannon2");
    context.fillStyle = "#000000";
    context.translate( width - 35 - 15, height-70-50-20+10 );
    //context.translate( width - 35 - 15 - 30, height-70-50-20+10 );
    context.rotate(-degrees*Math.PI/180);
    context.translate( -15, -10 );
    context.fillRect(0, 0, 30, 20);
    context.restore();

};

function renderScene(cannonRotation,curPlayer) {
    renderScenario();
    renderFloor();
    renderFortress();
    renderFortress2();
    if (curPlayer == 1) {
        renderCannon(cannonRotation);
        renderCannon2(0);
    }
    else {
        renderCannon(0);
        renderCannon2(cannonRotation);   
    }
}

function releaseBall(timeP,curPlayer,cannonRot) {
    console.log("Now playing: "+curPlayer.toString());
    var x,y;
    var vInit=timeP/30;
    vInit = Math.min(50,vInit);
    var theta = Math.abs(cannonRot);
    theta = theta*Math.PI/180.0;
    var vInitx = vInit*Math.cos(theta);
    console.log("Init vx: "+vInitx.toString());
    if (curPlayer == 1) {
        x=60;
        y = height - 70 - 50;
    }
    else {
        console.log("play 2 is playing");
        vInitx=-vInitx;
        x=width-60;
        y = height - 70 - 50;
    }
    var xBase = x;
    var yStart = y;
    a = -9.8;
    var index=1;
        
    console.log("Init vx: "+vInitx.toString());
    var vInity = vInit*Math.sin(theta);
    var advance = function() {
      
        renderScene(cannonRot,curPlayer);
    context.fillStyle = "#FFFFFF";
    context.beginPath();
    context.arc(x+4.0*vInitx*index/20.0, yStart-4.0*vInity*(index/20.0)-4.0*0.5*a*(index/20.0)*(index/20.0), 8, 2 * Math.PI,false);
    context.fill();
    var time = index/20.0;
        var yPos = vInity*time+0.5*a*time*time;
        var xPos = Math.abs(vInitx*time);
    //console.log("ycenter: "+yPos.toString());
    index++;
        if ((yPos < 0 - 10) || (xPos < 0) || (xPos > width)) {
            console.log("Velocity was: "+timeP.toString()+" y center:");
        }
        else {
            setTimeout(advance, 16);
        }
      
    }
    advance();
    
    
    //context.arc(x,y,8,0,2*Math.PI);
    
    
}

var timePressed = 0;
var timeBefore;
var curCannonRotate = 0;
var lastKey = 0;
var turn = 1; // player1 or player2
renderScene(curCannonRotate);

$('body').keydown(function(e){
    
    if (e.which==38) { // UP
        curCannonRotate-=1;
        curCannonRotate = Math.max(curCannonRotate,-90);
        renderScene(curCannonRotate,turn);
      //console.log(curCannonRotate);

    }
    else if (e.which==40) { // DOWN
        curCannonRotate+=1;
        curCannonRotate = Math.min(curCannonRotate,0);
        renderScene(curCannonRotate,turn);
      //console.log(curCannonRotate);
    }
    else if (e.which == 32) { // SPACE
        
        if (lastKey != 32) {
            console.log("first key down SPACE");
            var d = new Date();
            timeBefore = d.getTime();
        }
        //timePressed++;
        //console.log(timePressed);
    }
    lastKey = e.which;
});

$('body').keyup(function(e){
  
    if (e.which == 32) { // SPACE
        var d = new Date();
        var timeAfter = d.getTime();
        timePressed = timeAfter - timeBefore;
        timePressed = Math.min(2000,timePressed);
        console.log("Key pressed for "+timePressed.toString()+" units of time. Now "+turn.toString()+" plays.");
        releaseBall(timePressed,turn,curCannonRotate);
        if (turn == 1)
            turn=2;
        else
            turn=1;
        timePressed=0;
    }
    

});

document.body.appendChild(board);
};
