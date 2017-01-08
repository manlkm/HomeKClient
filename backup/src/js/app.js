angular.module('HomeKClient', [
  'ngRoute',
  'HomeKClient.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'index.html',  reloadOnSearch: false});
});