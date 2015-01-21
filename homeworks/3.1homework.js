var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
	if (err) throw err;
	db.collection('students').find({}).each(function(err, doc) {
		if (err) throw err;

		if (doc==null) {
			return db.close();
		};
	
		var lowest = 100;

		for (var i = 0; i < doc.scores.length; i++) {	
			if (doc.scores[i]['type'] === 'homework') {
				if (doc.scores[i]['score'] < lowest) {
					lowest =  doc.scores[i]['score'];
				};
			};
		}
		 console.log(doc);
		 console.log(doc['_id'])
		 db.collection('students').findOne({'_id':doc['_id']}, function(err, result) {
		 	if (err) throw err;
		 	console.log(result);
		 	return db.close();
		 });
		// db.collection('students').update({'_id':doc['_id']}, {$unset:{'scores.score':lowest}}, function(err, result) {
		// db.collection('students').findOne({'_id':doc['_id']}, function(err, result) {

		// 	if (err) throw err;
		// 	console.log(result);
		// 	// return db.close();
		// });
	});
	// db.collection('students').find(query, projection).each(function(err, doc) {
	// 	if (err) throw err;

	// 	if (doc==null) {
	// 		return db.close();
	// 	};

	// 	console.dir(doc.title);
	// });
});