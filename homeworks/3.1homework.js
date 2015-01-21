'use strict';

var MongoClient = require('mongodb').MongoClient,
	db,
	cursorExhausted = false,
	currentName,
	count = 0;

MongoClient.connect('mongodb://admin:admin@ds031721.mongolab.com:31721/school', connect);

function connect (err, database) {
	db = database;
	db.collection('students').find({}).each(checkGrade);
}

function checkGrade (err, doc) {
	if (err) {
		console.log(err);
	}

	if (doc==null) {
		cursorExhausted = true;
	}
	else if (currentName == null || currentName != doc.name){
		var lowest = 100;
	
		for (var i = 0; i < doc.scores.length; i++) {	
			if (doc.scores[i]['type'] === 'homework') {
				if (doc.scores[i]['score'] < lowest) {
					lowest =  doc.scores[i]['score'];
				};
			};
		}
		//console.log(doc['_id'])
		//db.collection('students').findOne({'_id':doc['_id']}, function(err, result) {
		db.collection('students').update({'_id':doc['_id']}, {$unset:{'scores.score':lowest}}, function(err, result) {
			count--;
			if (err) {
				console.log(err);
			}
			console.log(result);			
			if (cursorExhausted && count == 0) {
			 return db.close();
			}
		});
		currentName = doc.name;
		count++;
	}
		
		// db.collection('students').findOne({'_id':doc['_id']}, function(err, result) {
		
		// 	if (err) throw err;
		// 	console.log(result);
		// 	// return db.close();
		// });
		// db.collection('students').find(query, projection).each(function(err, doc) {
		// 	if (err) throw err;
		
		// 	if (doc==null) {
		// 		return db.close();
		// 	};
		
		// 	console.dir(doc.title);
		// });
}
