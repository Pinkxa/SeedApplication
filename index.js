var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    posts = require('./routes/posts');
var categories = require('./routes/categories');
var session = require('express-session');
var users = require('./routes/users');
var cookieParser = require('cookie-parser');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'linokuhlekamva',
      port: 3306,
      database: 'GetJob'
};

app.use(express.static(__dirname + '/public'));

app.use(myConnection(mysql, dbOptions, 'single'));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true})); -
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/contact', function (req, res) {
  res.render('contact');
})

app.get('/about', function (req, res) {
  res.render('about');
})

//app.get('/', posts.all);

app.get('/posts', posts.getAll);
app.get('/posts/showAdd', posts.showAdd);
app.get('/posts/:Id', posts.getPost);
app.post('/posts/update/:Id', posts.update);
app.post('/posts/add', posts.add);
app.get('/posts/delete/:Id', posts.delete);

app.delete('/posts/:Id', posts.delete);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('GetJob App listening at http://%s:%s', host, port);
});