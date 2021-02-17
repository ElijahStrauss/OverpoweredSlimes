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
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000*60*60*24*3,
    }
}));

//routes


app.get ('/', function (req, res){
    res.render('index', {nomen: req.session.username});
});

app.get ('/slime', function (req, res){
    res.render('slime', {nomen: req.session.username});
});

app.post ('/welcome' , (req, res)=>{
req.session.username=req.body.visitorname;
res.redirect('/');
})

app.listen(2000);