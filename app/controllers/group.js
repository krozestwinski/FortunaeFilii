var Group = require('mongoose').model('Group');

function getGroups(offset, callback) {	 
	var items = 50;
	Group.find({}, 'id name desc owner party size',{ skip: offset * items, limit: (offset + 1) * items }, function(err, results) {		
		if (err) return console.log(err);		
		callback(results);
	});
}

exports.all = function(req, res) {
	getGroups(0, function(results) {
		res.render('group/all', { groups: results });
	});
}

exports.new = function(req, res) {
	res.render('group/new');
}

exports.create = function(req, res) {
	var User = require('mongoose').model('User');
	var group = new Group(req.body);
	group.owner = req.user;
	group.save(function(err) {
		if (err) console.log(err);
	});
	res.redirect('/group/all');
}
