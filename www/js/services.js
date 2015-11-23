angular.module('starter.services', [])

// Validar conexion a Internet :D
// Tamaño de la imagen con resize
// Campo de Tarjeta de Credito en el form de la orden

.factory('Menu', function ($http){
  // Load ALL dishes
  var dishes = [];

  return {
    // Get ALL
    all: function () {
      console.log("Peticion de Platos");
      return $http.get("http://192.241.167.243:3000/dish/dishes").then( function (response){
        dishes = response.data;
        console.log(dishes);
        return dishes;
      });
    },
    // Get ONE
    get: function (dishID) {
      console.log("Peticion de Plato" + dishID);
      return dishes[dishID];
    }
  };
})

.factory('StatusOrder', function ($http) {
  var statusOrder = {};
  return {
    get: function (docID) {
      console.log ("Petición de Estado de Orden");
      console.log("Documento de Cliente: " + docID);
      return $http.get("http://192.241.167.243:3000/order/checkstatus/"+docID).then(function (response){
        statusOrder = response.data;
        return statusOrder;
      });
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    description: 'You on your way?',
    image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    description: 'Hey, it\'s me',
    image: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    description: 'I should buy a boat',
    image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    description: 'Look at my mukluks!',
    image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    description: 'This is wicked good ice cream.',
    image: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
