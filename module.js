var database = require('./modules/database');
var log = require('./modules/log');
var colors = require('colors');
var util = require('./modules/utilize');
var readline = require('readline');

var rs = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});


var param1 = process.argv[2];
var param2 = process.argv[3];

util.clear();

if (param1 == null || param2 == null)
{
	console.log('ERROR: Please provide module action and module name before running module manager'.red);
	console.log('Example: node module (add/rm/edit) name_of_module'.yellow);
	return;
}

console.log('Welcome in Smart Home System module manager.'.green);

if (param1 == 'add')
{
	console.log('\n');
	console.log('Preparing to create new module...'.yellow);
	console.log('New module with name: %s will be created.', param2);
	setTimeout(function(){setDescription(param2)}, 3000);
}

if (param1 == 'show')
{
	database.getModules(function (returned) {
		console.log(returned);
		process.exit();
	});
}

var setDescription = function (name) {
	util.clear();
	console.log('Smart module console wizard'.green);

	rs.question("Please provide module description for database (CZ):  ", function(answer) {
		console.log('Description accepted. Writing to database.'.green);
		console.log('please wait...'.red);
		setTimeout(function () {
			database.createNewModule(name, answer);
		}, 2000);
	});
}



