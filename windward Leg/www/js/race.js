var topSpeed = 1;
var tackPenalty = 0.25;
var boatList =[];
function Boat(type,name){
	this.name = name;
	this.playable = type;
	this.starboard = true;
	this.location = [150,600];
	this.speed = topSpeed;
	this.angle = 315;
	this.changeLocation = function(){
		this.location[0] = Math.cos(this.location[0]) * this.speed;
		this.location[1] = Math.sin(this.location[1]) * this.speed;
		this.element.style.left = this.location[0];
		this.element.style.top = this.location[1];
		if (this.speed < topSpeed){
			this.speed += tackPenalty / 180; 
		}else if (this.speed > topSpeed){
			this.speed = topSpeed;
		}
	}
}
function move(){
	for (var i=0;i<boatList.length;i++){
		boatList[i].changeLocation();
	}
}
var player = new Boat(true,"player");
var computer = new Boat(false,"com0");
boatList.push(player);
boatList.push(computer);
for (var i=0;i<boatList.length;i++){
	var boatElement = document.createElement("div");
	boatElement.id = boatList[i].name;
	boatElement.class = "sailBoat";
    document.body.appendChild(boatElement);
	this.element = document.getElementById(boatElement);
}
var going = setInterval(move(),15);