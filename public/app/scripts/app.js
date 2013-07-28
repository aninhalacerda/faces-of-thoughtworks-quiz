'use strict';

//module definition
angular.module('facesQuizApp.service', ['ngCookies', 'collection']);

angular.module('facesQuizApp', ['facesQuizApp.service'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/error', {
        templateUrl: 'views/error.html'
      })
      .when('/admin/:office/people', {
        templateUrl: 'views/admin/people.html',
        controller: 'AdminPeopleCtrl',
        resolve: {
          office: ['$http', '$route', '$q', '$location', function($http, $route, $q, $location){
            var deferred = $q.defer();
            $http.get('api/'+ $route.current.params.office+'.json')
              .success(function(response){
                deferred.resolve(response);
              })
              .error(function(data, status){
                deferred.reject(data, status);
                $location.path('/error')
              });

            return deferred.promise;
          }]
        }
      })
      .when('/game/:office', {
        templateUrl: 'views/game.html',
        controller: 'MainCtrl',
        resolve: {
          office: ['$http', '$route', '$q', '$location', function($http, $route, $q, $location){
            var deferred = $q.defer();
            $http.get('api/'+ $route.current.params.office+'.json')
              .success(function(response){
                deferred.resolve(response);
              })
              .error(function(data, status){
                deferred.reject(data, status);
                $location.path('/error')
              });

            return deferred.promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

  });