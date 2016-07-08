juke.controller('AlbumsCtrl', function($scope, $log, $q, $rootScope, GetAlbums) {
	GetAlbums.fetchAll()
	.then(function(albums) {
		$scope.albums = albums;
		var promises = albums.map(function(album) {
			return GetAlbums.fetchById(album.id)
		});
		$q.all(promises)
		.then(function(results) {
			$scope.albums.forEach(function(album, i) {
				album.numSong = results[i].songs.length;
				album.imageUrl = '/api/albums/' + album.id + '/image';
			})
		})
		.catch($log.error);
	})
	.catch($log.error)
	$rootScope.$on('showAlbums', showAlbums);
  	function showAlbums() {
    	$scope.showMe = true;
  	}
  	$rootScope.$on('viewSwap', function(event, data) {
  		$scope.showMe = (data.name === 'allAlbums');
  	})
  	$scope.viewOneAlbum = function (albumId) {
  		$rootScope.$broadcast('viewSwap', { name: albumId });
  		console.log(albumId);
	};


});