var squares = document.querySelectorAll(".square");
var colors,pickedColor,isWon;
var colorDisp = document.querySelector("#rgbIndicator");
var messageDisp = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var header = document.querySelector("#header");
var buttons = document.querySelectorAll(".mode");
var numSq = 6;

init();

function setColor(color){
	colorDisp.textContent = color;
}
function resetGame(){
	colors = getColors(numSq);
	pickedColor = colors[randomNum(colors.length)];
	setColor(pickedColor);
	messageDisp.textContent = "";
	header.style.backgroundColor = "steelblue";
	for(var i = 0 ; i<colors.length ; i++)
		squares[i].style.backgroundColor = colors[i];

	resetButton.textContent = "New Colors";
	isWon = false;
}
function displayBottom(T){
	for(var i = 3 ; i<6 ; i++){
		squares[i].style.display = T?"block":"none";
	}
}
function setAllBackground(){
	for(var i = 0 ; i<numSq ; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
}
function randomNum(len){
	return Math.floor(Math.random()*len);
}
function getColors(len){
	var colors = [];
	for(var i = 0 ; i<len ; i++){
		colors[i] = "rgb(";
		for(var j = 0 ; j<3 ; j++){
			num = String(Math.floor(randomNum(256)));
			colors[i]+=num + ", ";
		}
		colors[i] = colors[i].slice(0,colors[i].length-2);
		colors[i]+=')';
	}
	return colors;
}
function init(){
	resetButton.addEventListener("click",resetGame);
	setupModeButtons();
	setupSquares();
	resetGame();
}
function setupModeButtons(){
	for(var i = 0 ; i<2 ; i++){
		buttons[i].addEventListener("click",function(){ 
			var other = this.textContent === "Easy"?1:0;
			buttons[other].classList.remove("selected");
			this.classList.add("selected");
			numSq = other?3:6;
			displayBottom(other^1);
			resetGame();
		})
	}
}
function setupSquares(){
	for(var i = 0 ; i<numSq ; i++){
		squares[i].addEventListener("click",function(){
			if(isWon == true)
				return;
			if(this.style.backgroundColor !== pickedColor){
				this.style.backgroundColor = "#232323";
				messageDisp.textContent = "Try Again";
			}
			else{
				isWon = true;
				messageDisp.textContent = "Correct!!!";
				header.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
				setAllBackground();
			}
		})
	}
}