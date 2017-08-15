var express = require('express');
var app = express();

// port to be used for local deployment
const port = 5000;

// set EJS as the view engine
app.set('view engine', 'ejs');

// Home page
app.get('/', function(req, res) {
    res.render('pages/index.ejs');
});

app.get('/about', function(req, res) {
    res.render('pages/about.ejs');
});

// Routing for static files (images, etc.)
app.use('/static', express.static(__dirname + 'public'));

// Start listening for connections
app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
