
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var passportOptions = {
  failureFlash: 'Invalid email or password.',
  failureRedirect: '/login'
}

// controllers
var home = require('../app/controllers/home');
var user = require('../app/controllers/user');
var group = require('../app/controllers/group');

/**
 * Expose
 */

module.exports = function (app, passport) {

	app.get('/', home.index);
	app.get('/auth/google', passport.authenticate('google'));
	app.get('/auth/google/return',  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
	app.get('/user/profile/:id', user.profile);
	app.get('/user/all', user.all);
	app.get('/logout', user.logout);

	app.get('/group/all', group.all);
	app.get('/group/details/:id', group.details);
	app.get('/group/new', group.new);
	app.post('/group/new', group.create);
}
