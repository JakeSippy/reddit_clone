const db = require('../db/');

exports.index = function(req, res) {
        posts = db.query('SELECT * FROM postdata;', [], function(err, posts) {
        if (err) {
            console.log(err, posts);
        }
        res.render('pages/index', {posts});
    });
}

exports.about = function(req, res) {
    res.render('pages/about');
}

exports.viewpost = function(req, res) {
    const text = 'SELECT * FROM postdata WHERE postnumber = $1;'
    const id = req.params.id;

    if (!isNaN(id)) {
        db.query(text, [id], (err, post) => {
            if (post) {
                if (post.rows.length == 1) {
                    res.render('pages/post', {post});
                } else {
                    res.render('pages/404');
                }
            } else {
                res.render('pages/404');
            }
        });
    } else {
        res.render('pages/404');
    }
}

exports.makepost = function(req, res) {
    res.render('pages/makepost');
}

exports.post = function(req, res) {
    var title = req.body.title;
    var body = req.body.post;
    console.log('Title: ' + title + '\nBody:\n' + body);
    db.query('SELECT COUNT(*) FROM postdata;', (err, response) => {
        if (err) {
            console.log(err);
        }
        count = response.rows[0].count;
        count++;
        db.query('INSERT INTO postdata(postnumber, title, body) VALUES($1, $2, $3);', [count, title, body], (err, response) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully posted');
                res.redirect('/');
            }
        });
    });
    res.end();
}

exports.register = function(req, res) {
    res.render('pages/register');
}

exports.makeacc = function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user);
    console.log(pass);
    
}


