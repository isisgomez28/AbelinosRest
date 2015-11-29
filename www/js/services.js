angular.module('starter.services', [])

// Validar conexion a Internet :D

.factory('Menu', function ($http){
  // Load ALL dishes
  var dishes = [];

  return {
    // Get ALL
    all: function () {
      console.log("Peticion de Platos - Srv");
      // Peticion a API
      return $http.get("http://192.241.167.243:3000/dish/dishes").then( function (response){
        dishes = response.data;
        console.log(dishes);
        return dishes;
      });
    },
    // Get ONE
    get: function (dishID) {
      var dish = {};
      console.log("Peticion de Plato - Srv " + dishID);
      dish = dishes[dishID];
      dish.quantity = 1;
      return dish;
    }
  };
})

.factory('StatusOrder', function ($http) {
  var statusOrder = {};
  return {
    get: function (docID) {
      console.log ("Petición de Estado de Orden - Srv");
      console.log("Documento de Cliente: " + docID);
      // Peticion a API
      return $http.get("http://192.241.167.243:3000/order/checkstatus/"+docID).then(function (response){
        statusOrder = response.data;
        return statusOrder;
      });
    }
  };
})

.service ('SelectedDishes', function ($http){
  var dishesToOrder = [];
  var subtotal = 0;
  var itbis = 0;

  this.addDishToOrder = function (dish) {
    console.log("====Service====");
    console.log("Accion de Añadir Plato a Orden");
    console.log(dish);
    dishesToOrder.push(dish);
    console.log("Lista de Platos Seleccionados");
    console.log(dishesToOrder);
  };
  
  this.isEmpty = function () {
      var empty = true;
      if (dishesToOrder.length > 0) {
        empty = false;
      }
      return empty;
  };

  this.getAll = function () {
    console.log("====Service====");
    console.log("Accion de ver Platos Seleccionados");
    return dishesToOrder;
  };

  this.remove = function (dishID){
    console.log("====Service====");
    console.log("Eliminar plato: " + dishID);
    for (i in dishesToOrder) {
      if (dishesToOrder[i].id == dishID) {
        console.log(dishesToOrder[i]);
        dishesToOrder.splice(i, 1);
      }
    };
  };

  this.getSubtotal = function (){
    subtotal = 0;
    
    /// Calculo de subtotal
    if (dishesToOrder.length > 0) {
      for (i in dishesToOrder) {
        subtotal += dishesToOrder[i].price * dishesToOrder[i].quantity;
      };
      console.log(subtotal);
    }

    return subtotal;
  };

  this.getITBIS = function () {
    itbis = 0;
    
    /// Calculo de ITBIS
    if (dishesToOrder.length > 0){
      itbis = subtotal * 0.18;
    }
    console.log(subtotal);

    return itbis;
  };

  this.postOrder = function (clientInfo) {
    var dishesIDs = [];
    var j = 0;

    // Collección de IDs de Platos Seleccionados
    for (i in dishesToOrder) {
        while (j < dishesToOrder[i].quantity) {
          dishesIDs.push(dishesToOrder[i].id);
          j++;
        }
        j = 0;
        // Eliminando platos seleccionados
        dishesToOrder.splice(i, 1);
    };

    var url = "http://192.241.167.243:3000/order/create";

    console.log(config);
    console.log(clientInfo);

    clientInfo.dish = dishesIDs;
    clientInfo.tax = 0.28;
    clientInfo.price = 0;
    clientInfo.status = 1;

    // send request to API
    var res = $http.post(url, clientInfo);
    console.log(res);
  };
});