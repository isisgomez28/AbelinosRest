module.exports = function (router){
	
	router.get('/order', function (req, res){
		res.json({var: "prueba"});
	})


	return router;
}