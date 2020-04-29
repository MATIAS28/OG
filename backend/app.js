'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar archivos de Rutas
var project_routes = require('./routes/project');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//Rutas
app.use('/', project_routes);


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/projecto-angular'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/projecto-angular/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

//exportar

module.exports = app;
