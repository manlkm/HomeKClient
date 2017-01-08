angular.module('HomeKClient', [
  'ngRoute',
  'mobile-angular-ui',
  'HomeKClient.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});