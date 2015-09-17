var orm = require ("orm");

orm.connect("my sql://admin:Pass123@hots/AbelinosRestaurant", function (err, db) {
	// Captura de error conexión con base de datos
	if (err) 
		throw err;

	// Propiedades del Modelo
	var User = db.define("person", {
		username		: String,
		name			: String,
		lastname		: String,
		email			: String,
		password		: Password,
		isAdmin			: Boolean,
		passwordReset	: String
	}, {
		methods: {
			fullname: function () {
				return this.name + ' ' + this.lastname;
			}
		}
	});
});