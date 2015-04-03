var log = require('./modules/log');
var ProgressBar = require('progress');

var param = process.argv[2];

var request = "CONSOLE";



if (param == "delete" || param == "remove" || param == "rm" || param == "clear")
{
	log.deleteLog(request);
	setTimeout(function () {
		return;
	}, 4000);
}

if (param == "test")
{
	for (var i = 0; i < 200; i++) {
		log.writeLog('Long test log value here');
	}
	console.log('done')
	return;
}

if (param == null)
{
	var bar = new ProgressBar(':bar', { total: 100 });
	var timer = setInterval(function () {
		bar.tick();
		if (bar.complete) {
			log.writeLog('Printing log to central console.');
			log.getLog(false, function (returned) {
				console.log(returned);
			});
			clearInterval(timer);
		}
	}, 5);
	return;
}

