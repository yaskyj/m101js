var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
	if (err) throw err;


	db.collection('students').find(query, projection).each(function(err, doc) {
		if (err) throw err;

		if (doc==null) {
			return db.close();
		};

		console.dir(doc.title);
	});
});