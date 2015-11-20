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

.controller ('MenuCtrl', function ($scope, $stateParams, Menu){
    Menu.all().then(function (dishes){
        $scope.dishes = dishes;
    });
    console.log("Peticion de Platos Ctrl.");
    console.log(Menu.all());
})

.controller('MenuDetailCtrl', function ($scope, $stateParams, Menu) {
    $scope.dish = Menu.get($stateParams.dishId - 1);
})

.controller('StatusOrder', function ($scope, $stateParams, StatusOrder){
    $scope.statusOrder = StatusOrder.get($stateParams.docId);
})

.controller('OrderCtrl', function($scope) {
  // Aqui metodos para la Orden ;)
})

.controller('OrderDetailCtrl', function($scope) {

});
