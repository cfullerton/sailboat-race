var topSpeed = 0.5;
var tackPenalty = 0.25;
var boatList =[];
var windDirection = 360;
function Boat(type,name){
	this.name = name;
	this.playable = type;
	this.starboard = true;
	this.location = [400,600];
	this.speed = topSpeed;
	this.angle = 315;
	var offAngle =0;
	this.tack = function(){
		if (this.starboard){
			this.starboard = false;
		}else {
			this.starboard = true;
		}
		//this.speed *= 1- tackPenalty;
	}
	this.changeLocation = function(){
		if (this.starboard){
			this.angle = windDirection -45;
			this.location[0] += Math.cos(Math.abs(360-this.angle) * (180 / Math.PI)) * this.speed; 
		    this.location[1] -= Math.sin((Math.abs(360-this.angle) * (180 / Math.PI))) * this.speed;
			console.log((360-this.angle));
		}else {
			this.angle = windDirection + 45;
			offAngle = 2;
			this.location[0] -= Math.cos(Math.abs(360-this.angle) * (180 / Math.PI)) * this.speed; 
		this.location[1] -= Math.sin((Math.abs(360-this.angle) * (180 / Math.PI))) * this.speed;
		}
		this.element.style.left = this.location[0] + "px";
		this.element.style.top = this.location[1] + "px";
	    this.element.style.transform = "rotate(" + this.angle + "deg)";
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
	//windDirection+=0.1;
}
var player = new Boat(true,"player");
var computer = new Boat(false,"com0");
boatList.push(player);
boatList.push(computer);
for (var i=0;i<boatList.length;i++){
	var boatElement = document.createElement("div");
	boatElement.id = boatList[i].name;
	boatElement.className = "sailBoat";
    document.body.appendChild(boatElement);
	boatList[i].element = document.getElementById(boatElement.id);
}
document.body.addEventListener("click", function(){player.tack()});
var going = setInterval(move,15);