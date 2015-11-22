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
    var docID = {};
    var objOrder = {};

    $ionicModal.fromTemplateUrl('templates/modal-template.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });
  
   $scope.openModal = function() {
      console.log($scope.docID);
      //$scope.statusOrder = StatusOrder.get($stateParams.docId);
      $scope.modal.show();
      docID = {};
      $scope.docID = docID;
   };
  
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
  
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
  
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
  
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
})

.controller('OrderDetailCtrl', function($scope) {

});
