var User = require('mongoose').model('User');

function getUsers(offset, callback) {	 
	var items = 50;
	User.find({}, 'google name id',{ skip: offset * items, limit: (offset + 1) * items }, function(err, results) {		
		if (err) return console.log(err);		
		callback(results);
	});
}

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.profile = function(req, res) {
	var id = req.params.id;	
	User.findById(id)
		.exec( function (err, data) {
			if (err) return console.log(err);
			if (!data) return console.log(new Error('Failed to load User ' + data));
			res.render('user/profile', { profile: data.google });	
		});
}

exports.all = function(req, res) {
	getUsers(0, function(results) {
		res.render('user/all', { profiles: results });
	});
}


