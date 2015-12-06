process.env.NODE_ENV = 'test';

var io = require('socket.io-client');
var should = require('chai').should();
var socketUrl = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};

describe('getQuestions', function() {

    it('should return 10 random questions if no opts given', function(done) {
        var client = io.connect(socketUrl, options);

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
    });
});
