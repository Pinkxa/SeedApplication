exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT Id, CategoryName from categories', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'categories', {
    			categories : results,
    		});
      });
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){ 
			return next(err);
		}
		
		var input = JSON.parse(JSON.stringify(req.body));

		//console.log("***********************");
        console.log(input);

		var data = {
            		CategoryName : input.CategoryName
        	};

        	//console.log("***********************");
        	console.log(data);

		connection.query('insert into categories set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/categories');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('EditCat',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var id = req.params.id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE categories SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/categories');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM categories WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/categories');
		});
	});
};
