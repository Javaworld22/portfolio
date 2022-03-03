var express = require('express');
const bodyParser = require ('body-parser')
var path = require('path')
const redirectSSL = require('redirect-ssl')
var app = express()

const port = process.env.PORT || 3030

app.use(redirectSSL.create({
  enabled: process.env.NODE_ENV === 'production'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.disable('etag');

app.use(express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use('/user',express.static(path.join(__dirname,'public/plugin')))
app.use('/font',express.static(path.join(__dirname,'public/assets/fonts')))

app.get('/', function(req, res) {
    res.render('index');
  });

app.listen(port, ()=>{console.log('Starting the server at port ' +port)})