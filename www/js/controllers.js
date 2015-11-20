angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller ('MenuCtrl', function ($scope, $state, menuService){
    menuService.getDishes().then(function (response){
        $scope.dishes = response.data;
        console.log($scope.dishes);
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('OrderCtrl', function($scope) {
  // Aqui metodos para la Orden ;)
})

.controller('OrderDetailCtrl', function($scope) {

});
