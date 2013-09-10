
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

/**
 * Expose
 */

module.exports = function (app, passport) {

	app.get('/', home.index);
	app.get('/auth/google', passport.authenticate('google'));
	app.get('/auth/google/return',  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
	app.get('/profile/:id', user.profile);
	app.get('/logout', user.logout);

}
