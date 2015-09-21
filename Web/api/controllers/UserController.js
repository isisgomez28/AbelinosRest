/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req, res) {
		res.view({
			layout: 'layoutadmin'
		});
	},

	create: function (req, res, next) {
		//Llamada POST a la API
		var request = require('request');
		//Diferenciar los objetos response de cada llamada
		//Res: web App | Response: API
		//Pasar parametro de la URL
		request.post({url:'https://api-arnesabel.c9.io:8080/abelinosapi/user', form: req.params.all()}, 
			function (err, response, body) {
		        if (err) {
					res.redirect('/user/new');
				}
				//Se redirecciona al login mientras tanto, pero es a la vista de usuarios.
				res.redirect('auth/login');
			}
		);
	}
};