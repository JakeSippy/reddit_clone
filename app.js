var express = require('express');
const db = require('./db/index.js');
var app = express();

// port to be used for local deployment
const port = 5000;

// set EJS as the view engine
app.set('view engine', 'ejs');

// Home page
app.get('/', function(req, res) {
    posts = db.query('SELECT * FROM postdata;', [], function(err, res) {
        if (err) {
            console.log(err, res);
        }
        res.render('pages/index.ejs', {posts: res});
    });
});

// About page (move to routing dir later)
app.get('/about', function(req, res) {
    res.render('pages/about.ejs');
});

// Data page for testing
app.get('/data', function(req, res) {
    db.query('SELECT * FROM postdata', [], (err, result) => {
        if (err) {
            return err;
        }
        res.send(result);
    });
});
    

// Routing for static files
app.use('/static', express.static(__dirname + 'public'));

// Start listening for connections
app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
