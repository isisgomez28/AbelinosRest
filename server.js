var express = require('express');
var sequelizeOrm = require('sequelize');
var bodyParser = require('body-parser');
var password = require('passport');

// Express Application
var app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));

// Conexion con Base de Datos.
var sequelize = new sequelizeOrm('abelinos', 'root', '1234', {
  host: "localhost",
  port: 3328
});

// Modelos
var User = require('./models/user');
var Client = require('./models/client');

// Puerto del Servidor
var port = process.env.PORT || 3434;

// Router
var router = express.Router();

// Dummy router
router.get('/', function (req, res){
	res.json({message: 'running the basic router'});
});

// usersRoute
var usersRoute = router.route('/users');

// api/users for POST
usersRoute.post(function (req, res){
	console.log('Peticion de Creacion de Nuevo Usuario');
	
	var newUser = {
		username: req.body.username,
		name: req.body.name,
		lastname: req.body.lastname,
		password: req.body.password,
		email: req.body.email,
		isAdmin: req.body.isAdmin
	}

	User.create(newUser)
		.then(function(newUser){
			res.json({ message: 'NUEVO USUARIO CREADO', data: newUser });
		})
		.catch(function(err){
			console.log('ERROR en Peticion de Creacion de Nuevo Usuario');
			if (err)
      			res.send(err);
		});
});

// api/users for GET
usersRoute.get(function(req, res){
	User.findAll().then(function(err, users){
		if (err)
			res.send(err);

		res.json(users);
	});
});

// UserRoute - Single Object
var userRoute = router.route('/user/:username');

// UserRoute - GET
userRoute.get(function(req, res){
	User.findById(req.params.username).then(function(err, user){
		if (err)
			res.send(err);

		res.json(user);
	});	
});

// UserRoute - UPDATE
userRoute.put(function (req, res){

	User.findById(req.params.username).then(function(user){
		user.updateAttributes({
			name: req.body.name, 
			lastname: req.body.lastname,
			password: req.body.password,
			email: req.body.email,
			isAdmin: req.bod.isAdmin
		}).then(function(userUP){
			res.json({data: userUP});
		});
	}).catch(function(err){
		res.send(err);
	});
});

// clientsRoute
var clientRoute = router.route('/client');

clientRoute.post(function (req, res){
	console.log('Peticion de Creacion de Nuevo Cliente');
	
	var newClient = {
		name: req.body.name,
		id: req.body.id,
		secret: req.body.secret,
		userID: req.body.userID
	}

	Client.create(newClient)
		.then(function(newClient){
			res.json({ message: 'NUEVO CLIENTE CREADO', data: newClient});
		})
		.catch(function(err){
			console.log('ERROR en Peticion de Creacion de Nuevo Cliente');
			if (err)
      			res.send(err);
		});
});

// api/users for GET
clientRoute.get(function(req, res){
	Client.findById(id: req.client.id).then(function(err, clients){
		if (err)
			res.send(err);

		res.json(clients);
	});
});

app.use('/api', router);

app.listen(port);
console.log('Using port ~> ' + port);