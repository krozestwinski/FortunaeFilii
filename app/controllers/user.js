var User = require('mongoose').model('User');

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.profile = function(req, res) {
	var id = req.params.id;	
	User.findById(id)
		.exec( function (err, data) {
			console.log(data);
			if (err) return console.log(err);
			if (!data) return console.log(new Error('Failed to load User ' + data));
			res.render('user/profile', { profile: data.google });	
		});
}

