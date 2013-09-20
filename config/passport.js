
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var SteamStrategy = require('passport-steam').Strategy;
var User = mongoose.model('User')

/**
 * Expose
 */

module.exports = function (passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  });

  // use steam strategy
 passport.use(new SteamStrategy({
    returnURL: 'http://play.fortunaefilii.com/auth/steam/return',
    realm: 'http://play.fortunaefilii.com/',
	profile: true
  },
  function(identifier, profile, done) {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
	console.log('Identifier: ' + identifier);
	console.log('Profile: ' + JSON.stringify(profile));
	/*
      profile.identifier = identifier;
      User.findOne({ 'steam.id': profile.id }, function (err, user) {
        if (!user) {
          user = new User({
			authToken: accessToken,
           	name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            google: profile._json
          });
	      console.log('Saving user to DB');
          user.save(function (err) {
            if (err) console.log(err);
            return done(err, user)
          });
        } else {
		  console.log('User found in DB');
		  if (user.authToken != accessToken) {
			console.log('Refreshing user access token');
			user.authToken = accessToken;
			user.save(function (err) {
				if (err) console.log(err);
			});				
	*/
      return done(null, profile);
  }
));


  // use google strategy
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
	  scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (!user) {
          user = new User({
			authToken: accessToken,
           	name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            google: profile._json
          });
	      console.log('Saving user to DB');
          user.save(function (err) {
            if (err) console.log(err);
            return done(err, user)
          });
        } else {
		  console.log('User found in DB');
		  if (user.authToken != accessToken) {
			console.log('Refreshing user access token');
			user.authToken = accessToken;
			user.save(function (err) {
				if (err) console.log(err);
			});				
		  }
          return done(err, user)
        }
      })
    }
  ));
}
