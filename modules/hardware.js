var log = require('./log');
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/cu.usbmodem1451", {
	baudrate: 9600
});

var receivedTemp = 0;
var receivedLight = 0;

var turnLight = false;
var turnSound = false;




/*
PARAMETR FOR STANDALONE HARDWARE SUPPORT
 */

var param = process.argv[2];

if (param == "sound")
{
	setTimeout(function () {
		turnSound = true;
	}, 1000);
	setTimeout(function () {
		return;
	}, 2000);
}

if (param == "light")
{
	setTimeout(function () {
		turnLight = true;
	}, 1000);
	setTimeout(function () {
		return;
	}, 2000);
}




serialPort.on("open", function () {
	console.log('Hardware loaded correctly');
	serialPort.on('data', function(data) {
		//console.log(parseInt(data));
		var data = parseInt(data);
		if (data <= 40)
		{
			receivedTemp = data;
			//console.log(receivedTemp)
		}
		else
		{
			receivedLight = data;
			//console.log(receivedLight)
		}

		if (turnLight)
		{
			serialPort.write("1", function(err, results) {
				//console.log('Turn on light API - on');
				log.writeLog('light_blink');
				turnLight = false;
			});
		}
		if (turnSound)
		{
			serialPort.write("2", function(err, results) {
				//console.log('Turn on sound API - on');
				log.writeLog('sound_played');
				turnSound = false;
			});
		}

	});
});


/*
	DIRECT API for ARDUINO CONTROL
 */

var returnTemperature = function () {
	return receivedTemp;
}
var returnLight = function () {
	return receivedLight;
}
var sendLight = function () {
	turnLight = true;
	return true;
}
var sendSound = function () {
	turnSound = true;
	return true;
}







/*
-----------------------


	EXPORTED API for ARDUINO CONTROL


-----------------------
 */
exports.getCurrentLight = function () {
	return returnLight();
}
exports.getCurrentTemperature = function()
{
	return returnTemperature();
}
exports.playSound = function()
{
	return sendSound();
}
exports.turnLight = function () {
	return sendLight();
}