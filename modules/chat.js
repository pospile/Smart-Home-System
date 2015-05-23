var Parse = require('parse').Parse;
Parse.initialize("OZzaxhboZwBA0LKHSW8TWWjyKUQNde6n7D7Ie8Ue", "ZNk19fV7khFmfEpQ2yZurDGyectCQw2nK5rHhH7d");


var Chat = Parse.Object.extend("chat");
var Key = Parse.Object.extend('key');
var key = new Key();


console.log("Preparing sockets");


io = require('socket.io').listen(3000);

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('open', function(msg){
    console.log(msg);
    io.emit('open', msg);
  });

  socket.on('message', function(msg){


  	key.id = 'w0wReSygV2';
	key.increment("key");
	key.save(null, {
		success: function(key)
		{
			var keyIndex = key._serverData.key;
			var chat = new Chat();
			chat.set('from', msg.from);
			chat.set('to', msg.to);
			chat.set('message', msg.message);
			chat.set('key', keyIndex);
			chat.save(null);
		}
	});
    
	


    console.log("to: " + msg.to + " from: " + msg.from + " message: " + msg.message);
    io.emit('message', msg);

  });

});


var returnChatMessages = function (from, to, start, callback)
{
	final = [];
	var query = new Parse.Query(Chat);
	query.containedIn("to",[from, to]);
	query.containedIn("from",[from, to]);
	query.limit(start + 10);
	query.skip(start);
	query.descending("key");
	query.find({
		success: function(results) {
			var messages = {};
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				messages.from = object._serverData.from;
				messages.to = object._serverData.to;
				messages.message = object._serverData.message;
				messages.key = object._serverData.key;
				final.push(messages);
				messages = {};
			}
			callback(final);
			final = [];
		}
	});
}



/*

		EXPORTS ZONE BELOW

*/





exports.returnChatMessages = function (from, to, start, callback) {
	returnChatMessages(from, to, start, function (response) {
		callback(response);
	});
}

exports.testMessage = function (text) {
	var msg = {to: 'pospile', from: 'lenka', message: text};
	io.emit('message', msg);
}