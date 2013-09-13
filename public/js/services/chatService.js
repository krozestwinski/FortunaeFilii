function chatService() {
  	var socket = io.connect('http://play.fortunaefilii.com');
	
	this.connect = function (callback) {
	    socket.on('chat-message', function (data) {
        	if(data.message) {
				callback(data.user, data.message);
        	} else {
            	console.log("There is a problem:", data);
        	}
		});
    }; 

	this.sendMessage = function (data) {
		socket.emit('chat-send', data);
	};
	
	return this;
}
