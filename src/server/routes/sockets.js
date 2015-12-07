var io = require('socket.io')();
var requests = require('../utils/ext-requests');

io.on('connection', function(socket) {

    socket.on('message', function(msg) {
        console.log('message received: ', msg);
        socket.emit('message', 'message received: ' + msg);
    });

    /** getQuestions socket event */
    socket.on('getQuestions', function(options) {
        var randomGame = !options || options.random;
        if (randomGame) {
            var opts = randomGame ? {random: true} : options;
            requests.getGameQuestions(opts)
            .then(function(questions) {
                socket.emit('getQuestions', questions);
            });
        }
        else {
            requests.getGameQuestions(options)
            .then(function(data) {
                socket.emit('getQuestions', data);
            });
        }
    });
});

module.exports = io;
