var express = require('express');
var db = require('./db/index');
var bodyParser = require('body-parser');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Routes
var site = require('./routes/site');

// port to be used for local deployment
const port = 5000;

// set EJS as the view engine
app.set('view engine', 'ejs');

////////////////////  Routes //////////////////////

// General Pages
app.get('/', site.index);
app.get('/about', site.about);
app.get('/register', site.register);
app.post('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.query('SELECT username FROM users;', [], (err, usernames) => {
        var nameTaken = false;
        for (var i = 0; i < usernames.rows.length; i++) {
            if (usernames.rows[i].username === username) {
                console.log('name taken');
                res.end();
            }
        }
    });
    var salt = crypto.randomBytes(32).toString('base64');
    crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, derivedKey) => {
        if (err) throw err;
    });
    res.end();
});

// Posts
app.get('/posts/:id', site.viewpost);
app.get('/post', site.makepost);
app.post('/post', site.post);

// Static Pages
app.use('/static', express.static(__dirname + '/public'));

// 404 Catcher
app.use(function(req, res, next) {
    res.status(404).send('404 MF');
});

// Start listening for connections
app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
