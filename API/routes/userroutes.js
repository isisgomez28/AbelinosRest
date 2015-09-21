module.exports = function (router){

	router.get('/user', function (req, res){
		res.json({var: "retorna todos los usuarios"});
	});

	//Crea un usario (por el verbo POST)
	router.post('/user', function (req, res){
	});


	return router;
}