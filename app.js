express = require('express');
const { Pool, Client } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    console.log(err, res);
    pool.end();
});

app.get('/', function(req, res) {
    res.send('Hello');
});

app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
