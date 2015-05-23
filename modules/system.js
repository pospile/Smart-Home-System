var hardware = require('./hardware');
var security = require('./security');
var user = require('./user');
var log = require('./log');
var cloud = require('./cloud');
var util = require('./utilize');


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



exports.createUser = function (name, pass, mail, callback) {
	security.createUser(name, pass, mail, function (data) {
		callback(data);
	});
}
exports.logInUser = function (name, pass, callback) {
	user.logInUser(name, pass, function (data) {
		callback(data);
	})
}
exports.generateSecretToken = function (name, pass, callback) {
	security.generateSecretToken(name, pass, function (data) {
		callback(data);
	})
}

exports.getUserList = function (callback) {
	user.returnUser(function (data) {
		callback(data);
	});
}

exports.getUserList = function (callback) {
	user.returnUser(function (data) {
		callback(data);
	});
}





exports.streamFileToBrowser = function (res, id, callback) {
	cloud.streamFileToBrowser(res, id, function (data) {
		callback(data);
	});
}
exports.generateFilmList = function (page, callback) {
	cloud.generateFilmList(page, function (data) {
		callback(data);
	})
}