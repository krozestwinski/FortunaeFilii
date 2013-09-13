window.onload = function() {
 
    var socket = io.connect('http://play.fortunaefilii.com');
 
    socket.on('message', function (data) {
        if(data.message) {
			alert(data.message);
        } else {
            console.log("There is a problem:", data);
        }
    });
 
 
}
