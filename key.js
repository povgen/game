var keys = {
	'W' : 87,
	'S' : 83,
	'A' : 65,
	'D' : 68
};

var keyDown = {};

function setKey(keyCode) {
	keyDown[keyCode] = true;
}

function isKeyDown(keyName) {
	return keyDown[keys[keyName]];
}
 
function clearKey(keyCode) {
    keyDown[keyCode] = false;
}

function gameEngine() {

	if (typeof engine == 'function') 
        engine();
	else
		console.error('Не определена функция engine')

	requestAnimationFrame(gameEngine);
}

window.onload = function () {
	window.onkeydown = function (e) {
		setKey(e.keyCode);
	};

	window.onkeyup = function(e) {
		clearKey(e.keyCode);
	};
	gameEngine();
}