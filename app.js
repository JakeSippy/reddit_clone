express = require('express');
const { Pool, Client } = require('pg');

const app = express();
const port = 5000;

app.get('/', function(req, res) {
    res.send('Hello');
    res.send(process.env.DATABASE_URL);
});

app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
