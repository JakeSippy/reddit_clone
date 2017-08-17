var express = require('express');
var db = require('./db/index');
var app = express();

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
app.get('/post/:id', site.viewpost);

// Posts
app.get('/posts', site.index);

// Static Pages
app.use('/static', express.static(__dirname + 'public'));

// 404 Catcher
app.use(function(req, res, next) {
    res.status(404).send('404 MF');
});

// Start listening for connections
app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
