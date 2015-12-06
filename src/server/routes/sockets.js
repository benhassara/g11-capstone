var io = require('socket.io')();
var request = require('request-promise');
var jService = 'http://jservice.io/api/random';

io.on('connection', function(socket) {
    console.log('its happening!');

    socket.on('message', function(msg) {
        console.log('message received: ', msg);
        socket.emit('message', 'message received: ' + msg);
    });

    socket.on('getQuestions', function(options) {
        if (!options || options.random) {
            getGameQuestions({random: true})
            .then(function(questions) {
                socket.emit('getQuestions', questions);
            });
        }
    });

    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});

function getGameQuestions(options) {
    var url = jService;

    if (options.random) {
        url += '?count=10';
    }
    return request(url)
    .then(function(response) {
        return JSON.parse(response);
    });
}

module.exports = io;
