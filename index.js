var util = require('util');
var request = require('request');
var express = require('express');
var five = require("johnny-five");
var board = new five.Board();
var app = express();

board.on("message", function(event) {
	console.log("[%s] [%s] [%s] [%s]", event.timestamp, event.type, event.class, event.message);
});

board.on("ready", function() {
	var led = new five.Led(13);
});

function checkBoard(req, res, next) {
	if (board.isReady) {
		return next();
	}

	return res.status(503).end("board is not ready")
}

// app.post('/alerts', function(req, res) {
app.get('/', checkBoard, function(req, res) {
	res.end(JSON.stringify(board));
});

var port = 3000;
app.listen(port, function() {
	console.log('Listening on %s', port);
})

var one_min = 60*1000;

//check for last deploy
setInterval(function() {
	pools.forEach(function(pool) {
		var url = util.format('http://api.melicloud.com/compute/pools/%s/deploys', pool);
		request.get(url, function(error, res, deploys) {
			if (error) return;
			
			var last = deploys.pop();
		});
	});
}, one_min);