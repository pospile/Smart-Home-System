var colors = require('colors');
var utilize = require('./modules/utilize');
var log = require('./modules/log');
var router = require('./modules/router');
var ProgressBar = require('progress');
var system = require('./modules/system');



system.setStatus('booting');

var param = process.argv[2];

if (param == "log")
{
	var bar = new ProgressBar(':bar', { total: 100 });
	var timer = setInterval(function () {
	  bar.tick();
	  if (bar.complete) {
	    console.log('\nLog loaded succesfully\n');
		log.writeLog('Printing log');
		log.readyLog(true);
	    clearInterval(timer);
	  }
	}, 5);
	return;
}


log.writeLog('Booting system...');
utilize.clear();


console.log("Welcome in Smart Home System OS...".red);
console.log("Initializing...".yellow);
console.log("Loading resources...".green);
log.writeLog('UI loaded..');





log.writeLog('API loaded into memory');


var bar = new ProgressBar(':bar', { total: 100 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
	log.writeLog('System is up and running');
	//log.printLog();
	system.setStatus('booted');
    clearInterval(timer);
	initialized();
  }
}, 25);

var initialized = function ()
{
	
	log.writeLog('Begin initialization');
	utilize.clear();
	console.log("Testing connection to Home System".red);
	system.setStatus('ok');
	system.setSound();
	router.initialize();

}

