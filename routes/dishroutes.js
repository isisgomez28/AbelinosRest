module.exports = function (router){
	
	router.get('/dish', function (req, res){
		res.json({var: "prueba"});
	})


	return router;
}