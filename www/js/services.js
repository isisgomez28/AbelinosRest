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
      console.log("Peticion de Plato - Srv" + dishID);
      return dishes[dishID];
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
});