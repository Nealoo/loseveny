var detailApp = angular.module('DetailApp', ['ui.router']);

detailApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/RELIANCE-MANAGEMENT');
	$stateProvider.state('reliance', {
		url: '/RELIANCE-MANAGEMENT',
		templateUrl: 'tpls/reliance.html'
	});
});

detailApp.controller('TopAreaController', ['$scope', function(){
	//
}]);