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
    console.log(req);
}
