var orm		= require ("orm");
var db = orm.connect('mysql://root:1234@localhost:3306/abelinos');

db.on('connect', function(err){
	if (err)
		return console.error('connection error => ' + err);

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
});

module.exports = db;