angular.module('starter.controllers', [])

.controller ('MenuCtrl', function ($scope, $stateParams, Menu){
    // Menu
    Menu.all().then(function (dishes){
        $scope.dishes = dishes;
    });
    console.log("Peticion de Platos Ctrl.");
    console.log(Menu.all());
})

.controller('MenuDetailCtrl', function ($scope, $stateParams, Menu) {
    var selectedDishes = [];
    var subtotal = 0;
    var itbis = 0;
    $scope.dish = Menu.get($stateParams.dishId - 1);

    console.log($scope);

    $scope.addDish = function () {
        /// Agregar Plato
        if ($scope.dish.id != null && $scope.addToOrder && $scope.quantity > 0){
          console.log($scope.dish);
          console.log($scope.addToOrder);
          console.log($scope.quantity);
          var dishSelected = {id: $scope.dish.id,
            image: $scope.dish.image,
            name: $scope.dish.name,
            type: $scope.dish.type,
            quantity: $scope.quantity, 
            price: $scope.dish.price};
          console.log(dishSelected);
          selectedDishes.push(dishSelected);
          dishSelected = {};
        }
        
        // Elimina Plato de la Orden
        if ($scope.dish.id != null && !$scope.addToOrder && $scope.quantity > 0){
          $scope.quantity = 0;
          for (i in selectedDishes) {
            if (selectedDishes[i].id == $scope.dish.id) {
              console.log(selectedDishes[i]);
              selectedDishes.splice(i, 1);
            }
          };
        }

        /// Calculo de subtotal e ITBIS
        if (selectedDishes.length > 0) {
          for (i in selectedDishes) {
            subtotal += selectedDishes[i].price * selectedDishes[i].quantity;
          };

          itbis = subtotal * 0.18;

          console.log(subtotal);
          console.log(itbis);
        }
    };
})

.controller('StatusOrderCtrl', function ($scope, $ionicModal, StatusOrder){
    var docID = "";
    var msgStatus = "";
    var clientOrder = {};

    console.log($scope);

    $ionicModal.fromTemplateUrl('templates/modal-template.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });
  
   $scope.openModal = function() {
      docID = $scope.docID.toString();
      
      StatusOrder.get(docID.toString()).then(function (statOrder){
        clientOrder = statOrder;
        console.log(clientOrder);

        if (clientOrder.status == 1){          
            msgStatus = "En Espera"; 
            console.log(msgStatus);         
        }
        if (clientOrder.status == 2){
            msgStatus = "En Proceso";
            console.log(msgStatus);
        }
        if (clientOrder.status == 3){
            msgStatus = "Lista";
            console.log(msgStatus);
        }
        if (!clientOrder){
            msgStatus = "No Posee Ordenes Creadas";
            console.log(msgStatus);
        }

        clientOrder.status = msgStatus;

        $scope.clientOrder = clientOrder;

        console.log($scope);
      });

      console.log("Resultados de Orden");
      $scope.modal.show();
   };
  
   $scope.closeModal = function() {
      $scope.modal.hide();
      docID = "";
      msgStatus = "";
      $scope.docID = docID;
      $scope.msgStatus = msgStatus;
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

.controller('OrderCtrl', function ($scope, $stateParams){

})

.controller('OrderDetailCtrl', function($scope) {

});