var objects = {} || objects;

function PhysicalElement() {
  //Initialization for all Animals
}

//Function and properties shared by all instances of Animal
PhysicalElement.prototype.init=function(spriteImg,isColider) {
  this.sprite=spriteImg;
  this.isColider = isColider;
}
PhysicalElement.prototype.getPosition=function(){ // polimorfismo por inclusao
    console.log("getting position");
}

function Fortress(spriteImg,isColider) {
    this.init(spriteImg,isColider);

}
//Function and properties shared by all instances of Cat    
Fortress.prototype=new PhysicalElement();

function Ball(spriteImg,isColider) {
    this.init(spriteImg,isColider);
}

Ball.prototype=new PhysicalElement();

ball1 = new Ball("sprite.jpg",true);
console.log(ball1.sprite);

