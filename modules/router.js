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

	app.use(function (req, res, next) {

		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	var server = app.listen(2579, function () {

		var port = server.address().port
		log.writeLog('API server is running on secure port: 2579');
		console.log('DONE: API is running at http://localhost:%s'.green, port)

	})




// turn system OFF
	app.delete('/off', function (req, res) {
		setTimeout(function () {
			process.exit();
		}, 5000);
		log.writeLog('Turning system off in 5 seconds');
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

	app.get('/status/module/:id', function (req, res) {
		log.writeLog('returning_single_module');
		console.log('Finding: ' + req.params.id);
		db.getSingleModule(req.params.id, function (data) {
			res.json(data);
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

	app.get('/set/module', function (req, res) {
		db.writeModule(2, function (data) {
			//console.log(data);
			system.setCirc1();
			res.json(data);
		});
	});






}
