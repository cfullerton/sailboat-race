var topSpeed = 0.5;
var tackPenalty = 0.25 * topSpeed;
var boatList =[];
var windDirection = 360;
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
		//this.speed *= 1- tackPenalty;
	}
	this.changeLocation = function(){
		if (this.starboard){
			this.angle = windDirection -45;
			this.location[1] -= Math.cos(Math.abs(360-this.angle) * (Math.PI/180)) * this.speed; 
		    this.location[0] -= Math.sin((Math.abs(360-this.angle) * (Math.PI/180))) * this.speed;
			console.log(Math.abs((360-this.angle)));
		}else {
			this.angle = windDirection + 45;
			this.location[1] -= Math.cos(Math.abs(this.angle-360) * (Math.PI/180)) * this.speed; 
		this.location[0] += Math.sin((Math.abs(this.angle-360) * (Math.PI/180))) * this.speed;
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
/* controls the random wind Shifts */
var trendLength = 0;
var trendingUp = 0;
var currentStep = 0;
function windShift(){
	if (currentStep >= trendLength){
		trendLength = Math.floor(Math.random()*(45-5+1)+5);
		trendingUp = Math.floor(Math.random() * 2);
		currentStep = 0;
	}else if (currentStep < trendLength / 2){
		if (trendingUp){
			windDirection++;
		}else {
			windDirection--;
		}
		currentStep++;
	}else if (currentStep >= trendLength / 2){
		if (trendingUp){
			windDirection--;
		}else {
			windDirection++;
		}
		currentStep++;
	}
	
}
function move(){
	for (var i=0;i<boatList.length;i++){
		boatList[i].changeLocation();		
	}
	windShift();
}
var player = new Boat(true,"player");
var computer = new Boat(false,"com0");
boatList.push(player);
boatList.push(computer);
for (var i=1;i<8;i++){
	var newBoat = new Boat(false,"com"+i);
	boatList.push(newBoat);
}
for (var i=0;i<boatList.length;i++){
	var boatElement = document.createElement("div");
	boatElement.id = boatList[i].name;
	boatElement.className = "sailBoat";
    document.body.appendChild(boatElement);
	boatList[i].location[0] = 400 + 20 * i;
	boatList[i].element = document.getElementById(boatElement.id);
	boatList[i].element.addEventListener("click", function(){
		for (boat in boatList){
			if (boatList[boat].name == this.id ){
				boatList[boat].tack();				
			}
		}
	});
}
var going = setInterval(move,50);