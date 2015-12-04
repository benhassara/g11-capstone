(function() {
    'use strict';

    angular.module('app', [
        'ui.router'
    ])

    .config(routeConfiguration);

    routeConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfiguration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/views/home.html'
            });
    }
})();
