'use strict';



var server = myApp.controller('PlaylistCtrl', ['$scope', 'localStorageService', function($scope, localStorageService){
  //localStorageService.clearAll();
  if(localStorageService.get("playlists")){
    $scope.playlists = JSON.parse(localStorageService.get("playlists"));
  }
  else {
    $scope.playlists = [];
    //$scope.currentId = 0;
  }
  $scope.newPlaylist = function(name) {
    $scope.playlists.push({name: name, songs: [], id: $scope.playlists.length});
    savePlaylist();
  }

  $scope.deletePlaylist = function(playlist) {
    $scope.playlists = _.without($scope.playlists, playlist);
    savePlaylist();
  }

  $scope.updatePlaylist = function(playlist, updatedPlaylist) {
    $scope.playlists[_.indexOf($scope.playlists, playlist)].name = updatedPlaylist;
    savePlaylist();
  }

  $scope.addSong = function (playlist, songName) {
    playlist.songs.push({name: songName, id: playlist.songs.length});
    savePlaylist();
  }

  $scope.deleteSong = function(playlist, songName) {
    playlist.songs = _.without(playlist.songs, songName);
    savePlaylist();
  }

  $scope.updateSong = function(playlist, song, updatedSongName){
    playlist.songs[_.indexOf(playlist.songs, song)].name = updatedSongName;
    savePlaylist();
  }
  var savePlaylist = function() {localStorageService.add('playlists', JSON.stringify($scope.playlists));}
}]);
