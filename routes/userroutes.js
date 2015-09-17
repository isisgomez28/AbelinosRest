
// call the packages we need
var express	= require('express');                        // call express
var app		= module.exports = express();                 // define our app using express

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});