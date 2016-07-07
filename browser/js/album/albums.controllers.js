juke.controller('AlbumsCtrl', function($scope, $log, $q, GetAlbums) {
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
		.catch($log.error)
		console.log($scope.albums)
	})
	.catch($log.error)
});