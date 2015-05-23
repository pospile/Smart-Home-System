var torrentStream = require('torrent-stream');
var request = require("request");


var streamFileToBrowser = function (res, id, callback) {

	

	//request("https://yts.to/api/v2/list_movies.json?sort=rating&limit=1", function(error, response, body) {
	request('https://yts.to/api/v2/movie_details.json?movie_id=' + id, function(error, response, body) {

		var returned = JSON.parse(body);
		//console.log(returned.data);
		//var magnet = 'magnet:?xt=urn:btih:' + returned.data.movies[0].torrents[0].hash + '&dn=' + encodeURIComponent(returned.data.movies[0].title) + '&tr=udp://open.demonii.com:1337&tr=udp://tracker.istole.it:80&tr=http://tracker.yify-torrents.com/announce';
		var magnet = 'magnet:?xt=urn:btih:' + returned.data.torrents[0].hash + '&dn=' + encodeURIComponent(returned.data.title) + '&tr=udp://open.demonii.com:1337&tr=udp://tracker.istole.it:80&tr=http://tracker.yify-torrents.com/announce';
		console.log(returned.data.torrents[0].hash);
		console.log(encodeURIComponent(returned.data.title));
		var engine = torrentStream(magnet, {path: './cloud/tmp'});

	  	engine.on('ready', function() {
		    engine.files.forEach(function(file) {
		    	console.log(file.name);
				if (file.name.indexOf(".txt") > 0)
				{
					file.deselect();
				}
				else
				{
					console.log("Downloading movie");
					var stream = file.createReadStream();
					stream.pipe(res);
					callback(true);
				}
		    });
		});
	});

}


var generateFilmList = function (page, debug, callback) {
	request('https://yts.to/api/v2/list_movies.json?limit=10&page=' + page + '&genre=comedy&sort_by=like_count', function(error, response, body) {

		var returned = JSON.parse(body);
		var temp = {};
		var final = [];
		for (var i = 0; i < returned.data.limit; i++) {
			temp.name = returned.data.movies[i].title;
			temp.year = returned.data.movies[i].year;
			temp.image = returned.data.movies[i].small_cover_image;
			temp.id = returned.data.movies[i].id;
			temp.rating = returned.data.movies[i].rating;
			temp.seeds = returned.data.movies[i].torrents[0].seeds;
			final.push(temp);
			temp = {};
		}

		if (debug)
		{
			callback(returned);
		}
		else
		{
			callback(final);
		}

	});
}








/*


		EXPORTS ZONE BELOW


*/

exports.streamFileToBrowser = function (res, id, callback) {
	streamFileToBrowser(res, id, function (data) {
		callback(data);
	});
}

exports.generateFilmList = function (page, callback) {
	generateFilmList(page, false, function (data) {
		callback(data);
	})
}