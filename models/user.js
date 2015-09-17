var orm = require ("orm");

orm.connect("my sql://admin:Pass123@host/AbelinosRestaurant", function (err, db) {
	// Captura de error conexión con base de datos
	if (err) 
		throw err;

	// Propiedades del Modelo
	var User = db.define('user', {
		username		: {type: String, require: true, key: true},
		name			: {type: String, require: true}
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
		}
	}, {
		validations: {
			username: orm.enforce.unique("Cuenta de Usuario ya existe")
		}
	});

	db.sync(function(err) {
		if (err)
			throw err;

		User.create({username: "admin", name: "Administrador", lastname: "Administrador", email: "", password: "Pass123", isAdmin: true}, function(err){
			if (err)
				throw err;
		});
	});
});