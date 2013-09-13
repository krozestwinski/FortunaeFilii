
/*!
 * Module dependencies.
 */
var connect = require('connect');
var  passportSocketIo = require("passport.socketio");

/*!
 * Expose
 */

module.exports = function (io, express, sessionStore, config) {
	io.set("authorization", passportSocketIo.authorize({
		cookieParser:	connect.cookieParser, //or connect.cookieParser
		key:			'connect.sid',        //the cookie where express (or connect) stores its session id.
		secret:			config.sessionSecret,  //the session secret to parse the cookie
		store:			sessionStore,      //the session store that express uses
		fail:			function(data, accept) {      // *optional* callbacks on success or fail
							accept(null, true);              // second param takes boolean on whether or not to allow handshake
						},
		success: 		function(data, accept) {
							accept(null, true);
						}
	}));

	io.set('transports', ['xhr-polling']);
	io.sockets.on('connection', function (socket) {		
	    socket.emit('chat-message', { user: 'Server', message: 'Welcome to the chat' });
		if (socket.handshake.user) {
			socket.broadcast.emit('chat-message', { user: 'server', message: socket.handshake.user.name + 'joined the room.' });
			socket.on('chat-send', function (data) {
	        	io.sockets.emit('chat-message', { user : socket.handshake.user.name, message: data });
    		});
		}
	});
}

