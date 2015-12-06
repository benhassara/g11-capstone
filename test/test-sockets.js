process.env.NODE_ENV = 'test';

var should = require('chai').should();
var socketClient = require('socket.io-client');
var options = {
    transports: ['websocket'],
    'force new connection': true
};
var app = require('../src/server/app');
var socketServer = require('../src/server/routes/sockets');
var port = process.env.PORT || 4545;
var socketUrl = 'http://localhost:' + port;
var http = require('http');
var server = http.createServer(function(req, res) {
    res.end('Connected');
});

describe('socket handlers', function() {

    before('init server', function() {
        var listener = server.listen(port);
        socketServer.attach(listener);
    });

    after('stop server', function() {
        server.close();
    });

    describe('getQuestions event', function() {
        it('should return 10 random questions if no opts', function(done) {
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

        it('should return 10 questions in a given category', function(done) {
            var client = socketClient.connect(socketUrl, options);

            client.on('getQuestions', function(data) {
                data.should.be.a('object');
                data.should.contain.all.keys(['id', 'title', 'clues_count', 'clues']);
                data.id.should.be.a('number');
                data.title.should.be.a('string');
                data.clues_count.should.be.a('number');
                data.clues.should.be.instanceof(Array);
                data.clues[0].should.be.a('object');
                data.clues[0].should.contain.all.keys(['id', 'question', 'answer', 'category_id']);
                data.clues[0].id.should.be.a('number');
                data.clues[0].question.should.be.a('string');
                data.clues[0].answer.should.be.a('string');
                data.clues[0].category_id.should.be.a('number');
                data.clues[0].category_id.should.equal(data.id);
                client.disconnect();
                done();
            });

            client.emit('getQuestions', {category: 15214});
        });
    });
});
