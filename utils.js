var moment = require('moment');
var request = require('request');

module.exports.getLastAlert = function(dept, cb) {

	var now = moment().format('YYYYmmdd');

	_searchEvents(dept, now, function(error, events) {
		if (error) return cb(error);
		if (!events || events.length = 0) {
			_searchEvents(dept, since, cb)
		}
	};
};

function _searchEvents(dept, since, cb) {
	var url = util.format('http://api.melicloud.com/monitoring/events/search?dept=%s&since=%s', dept, since);
	request.get(url, function(error, res, events) {
		if (error) return cb(error);	
		return cb(undefined, events);
	});
}