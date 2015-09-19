
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
//Routers por modulos
var userroutes = require('./routes/userroutes')(express.Router());
var orderroutes = require('./routes/orderroutes')(express.Router());
var dishroutes = require('./routes/dishroutes')(express.Router());
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080;

app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// rutas basicas
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token

// Agregar Routers a la express app.
app.use('/abelinosapi', userroutes);
app.use('/abelinosapi', orderroutes);
app.use('/abelinosapi', dishroutes);
// start the server 
app.listen(port);
console.log('Server en http://localhost:' + port);