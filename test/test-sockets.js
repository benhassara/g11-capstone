process.env.NODE_ENV = 'test';

var should = require('chai').should();
var socketClient = require('socket.io-client');
var options = {
    transports: ['websocket'],
    'force new connection': true
};
var app = require('../src/server/app');
var server = require('http').createServer(app);
var socketServer = require('../src/server/routes/sockets');
var port = process.env.PORT || 4545;
var socketUrl = 'http://localhost:' + port;

describe('getQuestions', function() {

    before(function() {
        var listener = server.listen(port);
        socketServer.attach(listener);
    });

    after(function() {
        server.close();
    });

    it('should return 10 random questions if no opts given', function(done) {
        var client = socketClient.connect(socketUrl, options);

        client.on('getQuestions', function(data) {
            data.should.have.length(10);
            data[0].should.contain.all.keys(['id', 'answer', 'question', 'category_id', 'category']);
            data[0].id.should.be.a('number');
            data[0].answer.should.be.a('string');
            data[0].question.should.be.a('string');
            data[0].category_id.should.be.a('number');
            data[0].category.should.be.a('object');
            client.disconnect();
            done();
        });

        client.emit('getQuestions');
        // should do the same thing if random: true is passed
        client.emit('getQuestions', {random: true});
    });
});
