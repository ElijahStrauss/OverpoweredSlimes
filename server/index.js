const express = require('express');
const ejs = require ('ejs');
const path = require ('path');

const clientPath = path.join(__dirname,'../client/')
const staticPath = path.join(clientPath,'/static/');
const viewPath = path.join(clientPath,'/views/')

const app = express();

app.set ('view engine','ejs');
app.set ('views', viewPath);

var x=0;

const counter= function(req,res,next){
    x++;
    console.log(x);
    next();
}

//app.use (counter);
app.use (express.static(staticPath));

app.get ('/', function (req, res){
    res.render('index');
});

app.get ('/slime', counter, function (req, res){
    res.render('slime',{count:x});
});



app.listen(2000);