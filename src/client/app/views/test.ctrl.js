(function() {
    'use strict';

    angular.module('app')
        .controller('TestCtrl', TestCtrl);

    TestCtrl.$inject = ['$scope', 'socket'];

    function TestCtrl($scope, socket) {
        $scope.messageReceived = 'waiting for message...';

        $scope.sendMessage = function() {
            console.log($scope.messageToSend);
            socket.emit('message', $scope.messageToSend);
        };

        $scope.$on('socket:message', function(ev, msg) {
            $scope.messageReceived = msg;
        });
    }
})();
