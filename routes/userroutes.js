
module.exports = function(){
    // call the packages we need
    var express    = require('express');        // call express
    var app        = express();                 // define our app using express
    
    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    app.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });

    //other routes..
}();