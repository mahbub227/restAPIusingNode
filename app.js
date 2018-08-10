var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var restController = require('./controllers/rest-controller');

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use('/api',restController);
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});



app.listen(process.env.port|| 8000, function(){
    console.log('listening for requests.');
});