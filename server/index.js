const express = require('express');
const ejs = require ('ejs');
const path = require ('path');
const { response } = require('express');
const bodyParser = require('body-parser');
const session = require ('express-session')

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    name: 'slimes',
    secret: 'eachdogneeds15cats',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000*60*60*24*3,
    }
}));

//routes


app.get ('/', function (req, res){
    res.render('index', {data: req.session});
});

app.get ('/slime', function (req, res){
    res.render('slime', {data: req.session});
});

app.post ('/welcome' , (req, res)=>{
console.log(req.body)
req.session.username=req.body.nombre;
res.send('SUCCESS');
})

app.listen(2000);