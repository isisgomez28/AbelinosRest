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

// UserRoutes
var userRoute = router.route('/users');

userRoute.post(function (req, res){
	console.log('Peticion de Creacion de Nuevo Usuario');
	
	var newUser = {
		username: req.body.username,
		name: req.body.name,
		lastname: req.body.lastname
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


app.use('/api', router);

app.listen(port);
console.log('Using port ~> ' + port);