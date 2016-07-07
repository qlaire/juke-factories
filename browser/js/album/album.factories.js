juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('ConvertTime', function() {
  return {
    convertSeconds: function(time) {
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      function str_pad_left(string,pad,length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
      }
      return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    }
  }
});

juke.factory('GetAlbums', function($http, $log) {
  var albumObj = {};

  albumObj.fetchAll = function() {
    return $http.get('/api/albums')
    .then(function(res) {
      return res.data;
    })
    .catch($log.error);
  };
  albumObj.fetchById = function(id) {
    return $http.get('/api/albums/' + id)
    .then(function(res) {
      return res.data;
    })
    .catch($log.error);
  };
  return albumObj;
});