var orm		= require ("orm");
var mysql	= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'pass123'
});

orm.connect(connection, function (err, db) {
	// Captura de error conexión con base de datos
	if (err) 
		throw err;

	// Propiedades del Modelo
	var User = db.define('user', {
		username		: {type: String, require: true, key: true},
		name			: {type: String, require: true},
		lastname		: {type: String, require: true},
		email			: {type: String, require: true},
		password		: {type: Password, require: true},
		isAdmin			: {type: Boolean},
		passwordReset	: {type: String}
	}, {
		methods: {
			fullname: function () {
				return this.name + ' ' + this.lastname;		
			}
		}, 
		validations: {
			username: orm.enforce.unique("Cuenta de Usuario ya existe")
		}
	});

// 	db.sync(function(err) {
// 		if (err)
// 			throw err;

// 		User.create({username: "admin", name: "Administrador", lastname: "Administrador", email: "", password: "Pass123", isAdmin: true}, function(err){
// 			if (err)
// 				throw err;
// 		});
// 	});
});