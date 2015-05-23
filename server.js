var colors = require('colors');
var utilize = require('./modules/utilize');
var log = require('./modules/log');
var router = require('./modules/router');
var ProgressBar = require('progress');
var system = require('./modules/system');
var notification = require('./modules/notification')();



system.setStatus('booting');

var param = process.argv[2];


if (param == "update")
{
	console.log("Downloading update... ".red);
}

if (param == "log")
{
	console.log('\nLog loaded succesfully\n');
	log.writeLog('Printing log');
	log.getLog(true);
	return;
}


log.writeLog('Booting system...');
utilize.clear();


console.log("Welcome in Smart Home System OS...".red);
console.log("Initializing...".yellow);
console.log("Loading resources...".green);
log.writeLog('UI loaded..');





log.writeLog('API loaded into memory');




var initialized = function ()
{
	
	log.writeLog('Begin initialization');
	utilize.clear();
	console.log("Testing connection to Home System".red);
	system.setStatus('ok');
	//system.setSound();
	router.initialize();

}

console.log('\ncomplete\n');
log.writeLog('System is up and running');
system.setStatus('booted');
initialized();