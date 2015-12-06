(function() {
    'use strict';

    angular.module('app')
        .controller('TestCtrl', TestCtrl);

    TestCtrl.$inject = ['$scope', 'socket'];

    function TestCtrl($scope, socket) {
        $scope.messageReceived = 'waiting for message...';

        $scope.sendMessage = function() {
            socket.emit('message', $scope.messageToSend);
        };

        $scope.getQuestions = function() {
            socket.emit('getQuestions');
        };

        $scope.$on('socket:message', function(ev, data) {
            $scope.messageReceived = data;
        });

        $scope.$on('socket:getQuestions', function(ev, data) {
            data.forEach(function(question) {
                if (question.answer.indexOf('<') !== -1) {
                    console.log('ans cleaned: ', question.answer);
                    question.answer = question.answer.replace(/<i>|<\/i>/g, '');
                }
            });
            $scope.questions = data;
        });
    }
})();
