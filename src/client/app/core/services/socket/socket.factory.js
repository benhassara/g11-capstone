(function() {
    'use strict';

    angular.module('app.core.services.socket')
        .factory('socket', socketFn);

    socketFn.$inject = ['socketFactory'];

    function socketFn(socketFactory) {
        var socket = socketFactory();
        socket.forward('message');
        return socket;
    }
})();
