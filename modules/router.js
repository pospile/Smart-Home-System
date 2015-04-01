var express = require('express');
var log = require('./log');
var system = require('./system');
var db = require('./database');

exports.initialize = function () {
	log.writeLog('Preparing to load APi');
	APIexpose();
}


function APIexpose (app)
{
	log.writeLog('Prepare completed..');
	var app = express();

	var server = app.listen(2579, function () {

		var port = server.address().port
		log.writeLog('API server is running on secure port: 2579');
		console.log('DONE: API is running at http://localhost:%s'.green, port)

	})



// turn system ON
	app.put('/', function (req, res) {
		console.log("");
		res.json({light: 'on'});
	});

// turn system OFF
	app.delete('/', function (req, res) {
		console.log("");
		res.json({light: 'off'});
	});

	/*

	 ***********************************
	 * **** SYSTEM STATUS ROUTERS **** *
	 ***********************************

	 */

	/* API FOR STATUS SET
	 app.post('/status/:status', function (req, res) {
	 console.log('changing system status')
	 res.json({system: req.params.status});
	 });
	 */


	app.get('/status', function (req, res) {
		log.writeLog('returning_system_status as JSON');
		res.json({system: system.getStatus()});
	});

	app.get('/status/temperature', function (req, res) {
		log.writeLog('returning_temperature_' + system.getTemperature());
		res.json({temperature: system.getTemperature()});
	});

	app.get('/status/light', function (req, res) {
		log.writeLog('returning_light_' + system.getLight());
		res.json({light: system.getLight()});
	});

	app.get('/status/log', function (req, res) {
		log.writeLog('returning_system_log');
		log.getLog(false, function (returned) {
			res.json(returned);
		});
	});
	app.get('/status/module', function (req, res) {
		log.writeLog('returning_all_modules');
		db.getModules(function (modules) {
			res.json(modules);
		});
	});


	/*

	 ***********************************
	 * **** SYSTEM SET ROUTERS **** *
	 ***********************************

	 */




	app.get('/set/light', function (req, res) {
		log.writeLog('light_turn_on');
		system.setLight();
		res.json({light: 'done'});
	});

	app.get('/set/sound', function (req, res) {
		log.writeLog('sound_turn_on');
		system.setSound();
		res.json({sound: 'done'});
	});










}
