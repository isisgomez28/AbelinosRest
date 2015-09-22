var express = require('express');
var sequelizeOrm = require('sequelize');
var bodyParser = require('body-parser');

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

userRoute.get(function(req, res){
	User.findById(req.params.username).then(function(err, user){
		if (err)
			res.send(err);

		res.json(user);
	});	
});

userRoute.put(function (req, res){
	var userToUpdate = User.build();

	userToUpdate.username = req.body.username;
	userToUpdate.name = req.body.name;
	userToUpdate.lastname = req.body.lastname;
	userToUpdate.password = req.body.password;
	userToUpdate.email = req.body.email;
	userToUpdate.isAdmin = req.body.isAdmin;

	User.update(userToUpdate).then(function(userToUpdate){
		res.json({ message: 'USUARIO ACTUALIZADO', data: userToUpdate });
	}).catch(function(err){
		console.log('ERROR en Peticion de Actualizacion de Usuario');
		if (err)
  			res.send(err);
	});

	// userToUpdate.updateByUsername(req.params.username, function (success){
	// 	console.log(sucess);

	// 	if (success){
	// 		res.json({message: 'Usuario Actualizado', data: userToUpdate});
	// 	}
	// 	else {
	// 		res.send(401, "Usuario no EXISTE");
	// 	}
	// }, function(err){
	// 	res.json({message: 'Usuario Actualizado', data: userToUpdate});
	// });
});

app.use('/api', router);

app.listen(port);
console.log('Using port ~> ' + port);