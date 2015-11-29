angular.module('starter.controllers', [])

.controller('OrderCtrl', function ($scope, SelectedDishes, $ionicPopup){
  var clientID = "";
  var clientName = "";
  var clientEmail = "";
  var creditCard = "";
  var clientPhone = "";
  var clientAddress = "";
  var forTakeOut = false;
  
  $scope.$on('$ionicView.enter', function (){
    console.log("====Controller====");
    console.log("Refrescar Montos");
    // GET Order Amounts
    $scope.subtotal = SelectedDishes.getSubtotal();
    $scope.itbis = SelectedDishes.getITBIS();
    $scope.total = $scope.subtotal + $scope.itbis;
  });

  $scope.clearAddress = function () {
    clientAddress = "";
    $scope.clientAddress = clientAddress;
    console.log($scope.forTakeOut);
  };

  $scope.placeOrder = function () {
    var popupConfirm = $ionicPopup.confirm({
      title: '<h3><strong>Confirmación</strong></h3>',
      template: '<h4>¿Desea colocar su orden?</h4>'
    });
    popupConfirm.then(function (res){
      if(res) {
        console.log('Confirmado');
        
        if ($scope.forTakeOut){
          $scope.clientAddress = "NA";
        }
        else {
          $scope.forTakeOut = false;
        }

        var clientObj = {
          clientID: $scope.clientID,
          email: $scope.clientEmail,
          telephone: $scope.clientPhone,
          card: $scope.creditCard,
          address: $scope.clientAddress,
          localorder: $scope.forTakeOut
        };

        console.log(clientObj);

        // Metodo para colocar la orden
        SelectedDishes.postOrder(clientObj);

        var alertPopup = $ionicPopup.alert({
          title: '<h4><strong>Confirmacion</strong></h4>',
          subTitle: 'Plato agregado a su orden.',
          okType: 'button-assertive'
        });
        alertPopup.then(function(res) {
          // Limpieza de scope
          $scope.clientID = "";
          $scope.clientName = "";
          $scope.clientEmail = "";
          $scope.creditCard = "";
          $scope.clientPhone = "";
          $scope.clientAddress = "";
          $scope.forDelivery = false;
          $scope.subtotal = 0;
          $scope.itbis = 0;
          $scope.total = 0;
        });
      } else {
        console.log('No Confirmado');
      }
    });
  };
})

.controller ('MenuCtrl', function ($scope, $stateParams, Menu){
    // GET List of Dishes
    Menu.all().then(function (dishes){
        console.log("Peticion de Platos Ctrl.");
        $scope.dishes = dishes;
        console.log(dishes);
    });
})

.controller('MenuDetailCtrl', function ($scope, $stateParams, Menu, SelectedDishes, $ionicPopup){
    $scope.dish = Menu.get($stateParams.dishId - 1);

    $scope.addDish = function () {
        console.log("====Controller====");
        console.log("Accion de agregar plato");
        /// Agregar Plato
        if ($scope.dish.id != null && $scope.dish.quantity > 0){
          var dishSelected = {id: $scope.dish.id,
            image: $scope.dish.image,
            name: $scope.dish.name,
            type: $scope.dish.type,
            quantity: $scope.dish.quantity, 
            price: $scope.dish.price};
          console.log("Plato a Agregar al Lista de Orden");
          console.log(dishSelected);
          // Agregar Plato a Servicio
          SelectedDishes.addDishToOrder(dishSelected);
          dishSelected = {};

          // Popup - Plato Agregado
          var popupAdded = $ionicPopup.alert({
            title: '<h4><strong>Confirmacion</strong></h4>',
            subTitle: 'Plato agregado a su orden.',
            okType: 'button-assertive'
          });
          popupAdded.then(function(res){
            $scope.dish.quantity = 1;
          });
        }
    };
})

.controller('StatusOrderCtrl', function ($scope, $ionicModal, StatusOrder){
    var docID = "";
    var msgStatus = "";
    var clientOrder = {};

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

.controller('OrderDetailCtrl', function ($scope, SelectedDishes) {
  var selectedDishes = [];

  $scope.$on('$ionicView.enter', function (){
    console.log("====Controller====");
    console.log("Refrescar Platos Seleccionados");
    // GET Platos Seleccionados
    selectedDishes = SelectedDishes.getAll();
    $scope.selectedDishes = selectedDishes;
  });

  $scope.deleteSelected = function (objDish) {
    SelectedDishes.remove(objDish.id);
    $scope.selectedDishes = SelectedDishes.getAll();
  };
});