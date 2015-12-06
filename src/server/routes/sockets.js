var io = require('socket.io')();
var request = require('request-promise');
var jService = {
    random: 'http://jservice.io/api/random?count=',
    category: 'http://jservice.io/api/category?id='
};

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
            getGameQuestions(opts)
            .then(function(questions) {
                socket.emit('getQuestions', questions);
            });
        }
        else {
            getGameQuestions(options)
            .then(function(data) {
                socket.emit('getQuestions', data);
            });
        }
    });
});

function getGameQuestions(options) {
    var url;

    if (options.random) {
        url = jService.random + '10';
    }
    else if (options.category) {
        url = jService.category + options.category;
    }

    return request(url)
    .then(function(response) {
        return JSON.parse(response);
    });
}

module.exports = io;
