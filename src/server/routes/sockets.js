var io = require('socket.io')();
var request = require('request-promise');
var jService = 'http://jservice.io/api/random';

io.on('connection', function(socket) {
    console.log('its happening!');

    socket.on('message', function(msg) {
        console.log('message received: ', msg);
        request(jService)
        .then(function(response) {
            var question = JSON.parse(response)[0];
            console.log(question);
            var resData = {
                message: msg,
                question: question
            };
            socket.emit('message', resData);
        });
    });

    socket.on('getQuestions', function(options) {
        if (!options) {

        }
    });

    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});

module.exports = io;

function getRandomQuestion() {
    request(jService)
    .then(function(response) {
        return JSON.parse(response);
    });
}
