'use strict'

juke.controller('SidebarCtrl', function($scope, $rootScope) {
	$scope.viewAlbums = function() {
		$rootScope.$broadcast('showAlbums');
		$rootScope.$broadcast('viewSwap', {name: 'allAlbums'});

	}
})