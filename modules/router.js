var express = require('express');
var bodyParser = require('body-parser');
var log = require('./log');
var system = require('./system');
var db = require('./database');
var chat = require('./chat');
var notification = require('./notification');


exports.initialize = function () {
	log.writeLog('Preparing to load APi');
	APIexpose();
}


function APIexpose (app)
{
	log.writeLog('Prepare completed..');
	var app = express();
	


	app.use(bodyParser.urlencoded({ extended: false }));

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

	 /*
	app.get('/notification', function (req, res) {
		//notification.send('Domov pod kontrolou!', {id: 1}, 'POZOR!');
		res.json({notified: true});
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



	/*
		USER ROUTEs BELOW
	 */

	app.post('/user/create',function(request,response){
		var username	=	request.body.name;
		var password	=	request.body.pass;
		var    email	=	request.body.mail;

		system.createUser(username, password, email, function (data) {
			response.json(data);
		});
	});

	app.post('/user/login',function(request,response){
		var username	=	request.body.name;
		var password	=	request.body.pass;
		system.logInUser(username, password, function (data) {
			response.json(data);
		});
	});

	app.post('/user/token',function(request,response){
		var username	=	request.body.name;
		var password	=	request.body.pass;
		system.generateSecretToken(username, password, function (data) {
			response.json(data);
		});
	});

	app.post('/user/list', function (request, response) {
		var token	=	request.body.token;

		if(token == '')
		{
			response.json({error: true});
		}

		log.writeLog('returning_user_list_to_' + token);

		system.getUserList(function (data) {
			response.json(data);
		})
	});


	app.post('/user/chat', function (request, response) {
		var token	=	request.body.token;
		var from	=	request.body.from;
		var to		=	request.body.to;
		var start	=	request.body.start;

		if(token == '')
		{
			response.json({error: true});
		}

		if(start == '')
		{
			start = 0;
		}

		chat.returnChatMessages(from, to, start, function (result) {
			response.json(result);
		})

	});

	app.post('/user/chat/test', function (request, response) {
		var token	=	request.body.message;
		chat.testMessage(token);

		response.json({done: true});
	});


	app.post('/user/location/save', function (request, response) {
		var token	=	request.body.token;

		if(token == '')
		{
			response.json({error: true});
		}

	});


}
