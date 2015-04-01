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

var printLog = function (toConsole, callback) {
	var query = new Parse.Query(Log);
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
			return;
		}
	});
}

var removeLog = function () {

	return true;
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

exports.readyLog = function (toConsole)
{
	var returned = printLog(toConsole);
}

exports.getLog = final;


exports.deleteLog = function (TOKEN)
{
	removeLog(TOKEN);
}
