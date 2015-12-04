var io = require('socket.io')();

io.on('connection', function(socket) {
    console.log('its happening!');

    socket.on('message', function(msg) {
        console.log('message received: ', msg);
        socket.emit('message', msg);
    });

    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});

module.exports = io;
