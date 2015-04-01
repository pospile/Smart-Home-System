var log = require('./log');
var Parse = require('parse').Parse;
Parse.initialize("OZzaxhboZwBA0LKHSW8TWWjyKUQNde6n7D7Ie8Ue", "ZNk19fV7khFmfEpQ2yZurDGyectCQw2nK5rHhH7d");

var Module = Parse.Object.extend("modules");
var final = [];


var newModule = function (name, description) {
	var module = new Module();
	module.set('name', name);
	module.set('description', description);
	module.set('owner', 'console');
	module.save(null);
	log.writeLog('New module created succesfully!');
	setTimeout(function () {
		console.log('Module saved succesfully!');
		process.exit();
	}, 5000);
}

var returnModules = function (callback) {
	var query = new Parse.Query(Module);
	query.find({
		success: function(results) {
			console.log('Number of modules: ' + results.length);
			var module = {};
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				module.name = object._serverData.name;
				module.description = object._serverData.description;
				module.owner = object._serverData.owner;
				final.push(module);
				module = {};
			}
			callback(final);
		}
	});
}




/*
		EXPORT FUNCTIONS BELOW
 */
exports.createNewModule = function (name, description)
{
	log.writeLog('Creating new module: ' + name);
	newModule(name, description);
}

exports.getModules = function (callback) {
	returnModules(function (retrieved) {
		callback(retrieved);
	})
}
