
/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {
  development: {
    root: rootPath,
    db: process.env.DB_CONNECTION_STRING || 'mongodb://localhost/your_app_db_dev',
	google: {
      clientID: process.env.GOOGLE_CLIENT_ID || "APP_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "APP_SECRET",
      callbackURL: process.env.GOOGLE_CALLBACK || "http://localhost:3000/auth/google/callback"
    }
  },
  test: {
    root: rootPath,
    db: process.env.DB_CONNECTION_STRING || 'mongodb://localhost/your_app_db_test'
  },
  production: {
  }
}
