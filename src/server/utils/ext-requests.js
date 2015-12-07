var request = require('request-promise');
var jService = {
    random: 'http://jservice.io/api/random?count=',
    category: 'http://jservice.io/api/category?id='
};

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

module.exports = {
    getGameQuestions: getGameQuestions
};
