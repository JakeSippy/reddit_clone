express = require('express');
var pg = require('pg');

const app = express();
const port = 5000;

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, fuction() {
    if (err) throw err;
    console.log('Connected to postgrs! Getting schemas...');

    client
        .query('SELECT table_schemma,table_name FROM information_schema.tables;')
        .on('row', fuction(row) {
            console.log(JSON.stringify(row));
        });
});


app.get('/', function(req, res) {
    res.send('Hello');
});

app.listen((process.env.PORT || port), function() {
    console.log(`Listening at http://127.0.0.1:${port}`);
});
