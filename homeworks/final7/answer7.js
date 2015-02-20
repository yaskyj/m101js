'use strict';

var MongoClient = require('mongodb').MongoClient;
var count = 0;

MongoClient.connect('mongodb://localhost:27017/photos', function(err, db) {
  if (err) throw err;
  db.collection('images').find({}).each(function(err, doc) {
    if (err) throw err;
    if (doc !== null) {
      var theID = doc['_id']
      db.collection('albums').findOne({images: theID}, function(err, doc) {
        if (err) throw err;
        if (doc == null) {
          db.collection('images').remove({_id: theID}, function(err, results) {
            if (err) throw err;
            console.dir(count);
            console.dir('another one ' + theID);
            count++;
          });
        }
      });
    }
  });
});

// function checkGrade (err, doc) {
//   if (err) {
//     console.log(err);
//   }

//   if (doc==null) {
//     cursorExhausted = true;
//   }
//   else if (currentName == null || currentName != doc.name){
//     var lowest = 100,
//       index;
  
//     for (var i = 0; i < doc.scores.length; i++) { 
//       if (doc.scores[i]['type'] === 'homework') {
//         if (doc.scores[i]['score'] < lowest) {
//           lowest = doc.scores[i]['score'];
//           index = i;
//         };
//       };
//     }
//     db.collection('students').update({'_id':doc['_id']}, {$pull:{scores:{score:lowest}}}, function(err, result) {
//       count--;
//       if (err) {
//         console.log(err);
//       }
//       if (cursorExhausted && count == 0) {
//        return db.close();
//       }
//     });
//     currentName = doc.name;
//     count++;
//   }
// }