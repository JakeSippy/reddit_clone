express = require('express');
const { Pool, Client } = require('pg');

const app = express();
const port = 5000;

console.log("URL HERE: " + process.env);


app.get('/', function(req, res) {
    res.send('Hello');
});

app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
