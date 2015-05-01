var hardware = require('./hardware');
var security = require('./security');
var log = require('./log');

status = 'off';


exports.getTemperature = function () {
	return hardware.getCurrentTemperature();
}

exports.getLight = function () {
	return hardware.getCurrentLight();
}

exports.getStatus = function () {
	return status;
}




exports.setLight = function () {
	return hardware.turnLight();
}
exports.setSound = function () {
	return hardware.playSound();
}
exports.setCirc1 = function () {
	return hardware.turnCircuit1();
}
exports.setStatus = function (statut) {
	log.writeLog('status_set_to_' + statut);
	status = statut;
}



exports.createUser = function (token, name, pass, mail, callback) {
	security.createUser(token, name, pass, mail, function (data) {
		callback(data);
	});
}
