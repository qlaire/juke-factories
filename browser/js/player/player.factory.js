'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var playerObj = {};
  var audio = document.createElement('audio');
	audio.addEventListener('ended', function () {
    playerObj.next();
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    playerObj.progress = audio.currentTime / audio.duration;
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  function mod (num, m) { return ((num % m) + m) % m; }
  playerObj.playing = false;
  playerObj.currentSong = null;
  playerObj.songList = null;
  playerObj.progress = 0;
  playerObj.start = function(song, songList) {
  	console.trace('top of start');
		if (song === this.currentSong) {
  		this.resume();
  	}
  	else {
	  	playerObj.pause();
	  	this.songList = songList || this.songList;
	  	this.currentSong = song;
	  	audio.src = song.audioUrl;
	    audio.load();
	    audio.play();
	    playerObj.playing = true;
			console.log(this.getCurrentSong());
	}
  };
  playerObj.pause = function(song) {
  	audio.pause();
  	playerObj.playing = false;
  };
  playerObj.resume = function(song) {
  	audio.play();
  	playerObj.playing = true;
  };
  playerObj.isPlaying = function() {
  	return this.playing;
  };
  playerObj.getCurrentSong = function() {
  	// console.log('the current song is', this.currentSong);
		return this.currentSong;
  };
  playerObj.next = function() {
  	var index = this.songList.indexOf(this.currentSong);
  	index = mod(index + 1, this.songList.length);
  	this.start(this.songList[index]);
  };
  playerObj.previous = function() {
  	var index = this.songList.indexOf(this.currentSong);
  	index = mod(index - 1, this.songList.length);
  	this.start(this.songList[index]);
  };
  playerObj.getProgress = function() {
    console.log("progress " + this.progress);
  	return this.progress;
  };
  
  return playerObj;
});
