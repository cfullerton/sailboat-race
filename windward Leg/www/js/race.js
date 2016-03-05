var topSpeed = 0.5;
var tackPenalty = 0.25;
var boatList =[];
var windDirection = 90;
function Boat(type,name){
	this.name = name;
	this.playable = type;
	this.starboard = true;
	this.location = [400,600];
	this.speed = topSpeed;
	this.angle = 315;
	this.tack = function(){
		if (this.starboard){
			this.starboard = false;
		}else {
			this.starboard = true;
		}
	}
	this.changeLocation = function(){
		if (this.starboard){
			this.angle = windDirection -45;
		}else {
			this.angle = windDirection + 45;
		}
		this.location[0] = this.location[0] - Math.cos(this.angle) * this.speed;
		this.location[1] = this.location[1] - Math.sin(this.angle) * this.speed;
		//if (this.element){
		    this.element.style.left = this.location[0] + "px";
		    this.element.style.top = this.location[1] + "px";
			console.log(this.location[0]);
		//}
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
	boatElement.className = "sailBoat";
    document.body.appendChild(boatElement);
	boatList[i].element = document.getElementById(boatElement.id);
}
document.body.addEventListener("click", function(){player.tack()});
var going = setInterval(move,15);