//Import (require) connection.js into orm.js
var connection = require('../config/connection.js')




//Create the methods that will execute the necessary MySQL commands in the controllers. 
//These are the methods you will need to use in order to retrieve and store data in your database.

var orm =
{

	//selectAll()

	selectAll: function (tableName, callback) {
		//mySQL Query
		connection.query('SELECT * FROM ??', [tableName], function (err, result) {
			if (err) throw err;
			callback(result);
		});
	},

	//insertOne()
	insertOne: function (tableName, cols, vals, callback) {
		//var sqDemo = "INSERT INTO table (col names) VALUES (vals)"
		var sqDemo = "INSERT INTO " + tableName
		sqDemo += " ("+cols.toString()+")"
		sqDemo += " VALUES ("+PrintQmarks(vals)+")";

		connection.query(sqDemo, vals, function (err, result) {
				if (err) throw err;
				callback(result);
			});

	},

	//updateOne()
	updateOne: function (burgerID, callback) {
		connection.query('UPDATE burgers SET ? WHERE ?', [{ devoured: true }, { id: burgerID }],
			function (err, result) {
				if (err) throw err;
				callback(result);
			});
	}
};

function PrintQmarks(arr){
	let qArray = [];
	for(var i = 0; i < arr.length; i++){
		qArray.push("?")
	}
	return qArray.toString()
}

// Export the ORM object in module.exports.
module.exports = orm;