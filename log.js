var log = require('./modules/log');
var readlineSync = require('readline-sync');
var ProgressBar = require('progress');

var param = process.argv[2];

var request = "CONSOLE";



if (param == "delete" || param == "remove" || param == "rm" || param == "clear")
{
	log.deleteLog(request);

	var bar = new ProgressBar(':bar', { total: 100 });
	var timer = setInterval(function () {
		bar.tick();
		if (bar.complete) {
			console.log('\nLog Removed succesfully\n');
			clearInterval(timer);
		}
	}, 50);
	return;
}

if (param == "test")
{
	for (var i = 0; i < 200; i++) {
		log.writeLog('Long test log value here');
	}
	console.log('done')
	return;
}


var bar = new ProgressBar(':bar', { total: 100 });
var timer = setInterval(function () {
	bar.tick();
	if (bar.complete) {
		log.writeLog('Printing log to central console.');
		log.readyLog(false);
		setTimeout(function () {
			console.log(log.getLog);
		}, 3000);
		clearInterval(timer);
	}
}, 5);
return;
