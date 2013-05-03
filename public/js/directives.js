'use strict';

/* Directives */

var directives = angular.module('myApp.directives', []);

// simple fade in animation for a touch of class...
directives.directive('fadeIn', function () {
    return {
        compile:function (elm) {
            $(elm).css('opacity', 0.0);
            return function (scope, elm, attrs) {
                $(elm).animate({ opacity:1.0 }, 1500);
            };
        }
    };
});

// this is the angular way to stop even propagation 
directives.directive('stopEvent', function () {
    return {
        restrict:'A',
        link:function (scope, element, attr) {
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    }
});

directives.directive('draggable', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.draggable({
        revert: true,
        start: function(event, ui) {
          //console.log("drag started");
        },
        stop: function(event, ui) {
          //console.log("drag stopped");
        }
      });
    }
  }
});

directives.directive('droppable', function($compile){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.droppable({
        //accept: ".itemHeader",
        //hoverClass: "drop-hover",
        drop: function(event, ui){
          console.log("dropped");
          var dragIndex = angular.element(ui.draggable).data('index'),
            dragE1 = angular.element(ui.draggable).parent(),
            dropE1 = angular.element(this);
          console.log("index: " + index);
          //console.log("dragE1: " + JSON.stringify(dragE1));
          //console.log("dropE1: " + JSON.stringify(dropE1));
          if(dragE1.hasClass('playlists') && dropE1.hasClass('playlists')) {
            scope.playlists.push(scope.playlists[dragIndex]);
            scope.playlists.splice(dragIndex, 1);
          }
          else if(dragE1.hasClass('songs') && dropE1.hasClass('songs')) {
            scope.songs.push(scope.songs[dragIndex]);
            scope.songs.splice(dragIndex, 1);
          }
          $scope.$apply();
        }
      });
    }
  };
});