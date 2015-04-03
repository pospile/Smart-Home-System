var Parse = require('parse').Parse;
Parse.initialize("OZzaxhboZwBA0LKHSW8TWWjyKUQNde6n7D7Ie8Ue", "ZNk19fV7khFmfEpQ2yZurDGyectCQw2nK5rHhH7d");


var Log = Parse.Object.extend("log");
var Key = Parse.Object.extend('key');
var key = new Key();
var keyIndex;

var final = [];

var loadKey = new Parse.Query(Key);
loadKey.get("QFj3t3kfol", {
	success: function(loadKey) {
		keyIndex = loadKey.get('key');
		//console.log('Server received log key: ' + keyIndex);
	}
});

var returnKey = function (returnCallback) {
	var getKey = new Parse.Query(Key);
	getKey.get("QFj3t3kfol", {
		success: function(loadKey) {
			keyIndex = loadKey.get('key');
			returnCallback(keyIndex);
		}
	});
}


var updateLog = function (val, user) {
	key.id = 'QFj3t3kfol';
	key.increment("key");
	key.save(null, {
		success: function(key)
		{
			keyIndex = key._serverData.key;
			writeLog(val, keyIndex, user);
			return keyIndex;
		}
	});
}

var writeLog = function (val, key, user) {
	var log = new Log();
	log.set('idKey', key);
	//console.log(key);
	log.set('log', val);
	log.set('user', user);
	log.save(null);
}



var printLog = function(toConsole, callback) {

	returnKey(function (key) {
		var query = new Parse.Query(Log);
		query.limit(key);
		query.find({
			success: function(results) {
				console.log('Number of logs: ' + results.length);
				var tabulated = {};
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					if (toConsole) {
						console.log('--------------------------------------------------------');
						console.log(object._serverData.idKey + ': ' + object._serverData.log);
					}
					tabulated.key = object._serverData.idKey;
					tabulated.log = object._serverData.log;
					final.push(tabulated);
					tabulated = {};
				}
				callback(final);
			}
		});
	});

}



var removeLogInit = function (token) {
	returnKey(function (key) {
		console.log('Removing '+ key + 'results.');
		removeLog(token, parseInt(key) + 10);
	});
}

var removeLog = function (token, limit) {
	var query = new Parse.Query(Log);
	query.limit(limit);
	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				object.destroy();
			}
			console.log('All logs removed. Saving database.');


			var loadKey = new Parse.Query(Key);
			loadKey.get("QFj3t3kfol", {
				success: function(loadKey) {
					loadKey.set('key', 0);
					loadKey.save();
					setTimeout(function () {
						updateLog('All logs removed by: ' + token, token);
						return;
					}, 2000);
				}
			});
		}
	});
}


//_____________EXPORT ZONE_______________________________
/*


			EXPORT ZONE BELOW: DANGER


 */



exports.writeLog = function (value)
{
	//console.log('zapisuji na server')
	updateLog(value, 'console');
	return true;
}


exports.getLog = function (toConsole, callback) {
	printLog(toConsole, function (returned) {
		callback(returned);
	});
}


exports.deleteLog = function (TOKEN)
{
	removeLogInit(TOKEN);
}
