'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  

  // state
  $scope.currentSong = PlayerFactory.getCurrentSong();
  $scope.getCurrentSong = PlayerFactory.getCurrentSong.bind(PlayerFactory);
  $scope.playing = PlayerFactory.isPlaying.bind(PlayerFactory);
  $scope.progress = function() {
      return PlayerFactory.getProgress.bind(PlayerFactory)() * 100;
    }

  $scope.toggle = function() {
    if($scope.playing()) {
      PlayerFactory.pause();
    }
    else {
      PlayerFactory.resume();
    }
  }
  // main toggle
  // $scope.toggle = function (song) {
  //   // if ($scope.playing) $rootScope.$broadcast('pause');
  //   // else $rootScope.$broadcast('play', song);
  //   if(PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
  //       PlayerFactory.pause();
  //   }  
  //   else {
  //     PlayerFactory.start(song, $scope.album.songs);
  //     $scope.currentSong = PlayerFactory.getCurrentSong();
  //   }
  //   $scope.playing = PlayerFactory.isPlaying();
  // };
  $scope.prev = PlayerFactory.previous.bind(PlayerFactory);
  $scope.next = PlayerFactory.next.bind(PlayerFactory);
  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }
  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }

  // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  // $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
