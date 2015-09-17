var express	= require('express'); 
var router 	= express.Router();
var User 	= require('./models/user');
var i = 0;

router.use(function (req, res, next){
	res.json({message: 'hooray! welcome to our api!'});
	next();
});

router.route('/users')
	.post(function(req, res){
		var user = new User();

		user.username	= req.body.username;
		user.name		= req.body.name;
		user.lastname	= req.body.lastname;
		user.email		= req.body.email;
		user.password	= req.body.password;
		user.isAdmin	= req.body.isAdmin;

		user.save(function(err){
			if (err) {
				res.send(err);
			};

			res.json({message: 'Usuario creado!'});
		});
	})

	.get(function(req, res){
		User.find(function(err, users){
			if(err)
				res.send(err);

			res.json(users);
		});
	});
module.exports = router;