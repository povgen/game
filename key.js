var keys = {
    'Up'   : 38,
    'Down' : 40,
    'Left' : 37,
    'Right': 39,
    'Enter': 13,

	'W'    : 87,
	'S'    : 83,
	'A'    : 65,
    'D'    : 68,
    'Space': 32,
    'Shift': 16
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
     //   console.log(e.keyCode);
		setKey(e.keyCode);
	};

	window.onkeyup = function(e) {
		clearKey(e.keyCode);
	};
	gameEngine();
}