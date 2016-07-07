'use strict';

juke.factory('PlayerFactory', function(){
  var playerObj = {};
  var audio = document.createElement('audio');
  function mod (num, m) { return ((num % m) + m) % m; };
  playerObj.playing = false;
  playerObj.currentSong = null;
  playerObj.songList = null;
  playerObj.progress = 0;
  playerObj.start = function(song, songList) {
  	if(song === this.currentSong) {
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
  	return this.progress;
  };
  
  return playerObj;
});
