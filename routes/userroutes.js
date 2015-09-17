var express	= require('express'); 
var router 	= express.Router();
var i = 0;

router.use(function(req, res, next){
	res.json({message: 'hooray! welcome to our api!'});
});

module.exports = router;