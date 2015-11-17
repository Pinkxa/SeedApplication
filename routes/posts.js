//var logger = require('./log');

exports.getAll = function (req, res, next) {
    req.getConnection(function(err, connection){
        connection.query("select * from posts", function(err, results){
            res.render('posts', {posts : results})
        });
    });
}
var count=0
exports.getPost = function (req, res, next) {
    console.log(count)
    count++;
    req.getConnection(function(err, connection){
        console.log(req.params.Id)
        connection.query("select * from posts where Id = ?", req.params.Id, function(err, results){
            console.log(results);
             res.render('edit_post', {post : results})
        });
    });

}

exports.update = function (req, res, next) {
    req.getConnection(function(err, connection){
        /*
        console.log(JSON.stringify(req.body));
        var data = JSON.parse(JSON.stringify(req.body));
        var Id = req.params.Id;
        var input = JSON.parse(JSON.stringify(req.body));
        */
        var data = {
            Post : req.body.post,
            Description : req.body.description
        };

        var id = req.body.id;

        //console.log(input);
        //console.log(data);
        connection.query("update posts set ? where Id = ?", [data, id], function(err, results){
            res.redirect("/posts");
        });
    });
}

exports.showAdd = function (req, res, next) {
    res.render('post');
}

exports.add = function (req, res, next) {

    var data = {
        Post : req.body.Post,
        Description : req.body.Description
    }
    console.log("data"+JSON.stringify(req.body));
    req.getConnection(function(err, connection){
        if (err) return next(err);
        connection.query("insert into posts set ?", req.body, function(err, results){
            res.redirect('/posts');

        });
    });
}

exports.delete = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err) return next(err);
        connection.query("delete from posts where Id = ?", req.params.Id, function(err, results){
            if (err) return next(err);
            res.redirect('/posts');
        });
    });

}