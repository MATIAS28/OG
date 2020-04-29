'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Matmun:Mocorillo123@networkcluster-ujvba.mongodb.net/test?retryWrites=true&w=majority")
                .then(() => {
                  console.log('Conectado a la base de datos local');
                })
                .catch(err => console.log(err));
