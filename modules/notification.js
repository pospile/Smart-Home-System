
module.exports = function (argument) {

	var pushbots = require('pushbots');
	var Pushbots = new pushbots.api({
	    id:'555110991779599e3a8b456a',
	    secret:'dfc57f3c13763353b4bf8aa5db180365'
	});

}

var sendNotification = function (message, custom, title) {
	Pushbots.setMessage(message ,1);
	Pushbots.customFields(custom);
	Pushbots.customNotificationTitle(title);
	Pushbots.push(function(response){
	    console.log(response);
	});
}

exports.send = function (message, custom, title) {
	sendNotification(message, custom, title);
}