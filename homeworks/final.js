//Question 1
db.messages.find({"headers.From": "andrew.fastow@enron.com", "headers.To": "jeff.skilling@enron.com"});

//Question 2
db.messages.aggregate([
  {"$unwind":"$headers.To"}, 
  {"$group": 
    {
      "_id":{"_id":"$_id"},
      "From":{"$first":"$headers.From"},
      "To":{"$addToSet":"$headers.To"}
    }
  },
  {"$unwind":"$To"},
  {"$group":
    {
      "_id":{
        "From":"$From",
        "To":"$To"
      },
      "count":{"$sum":1}
    }
  },
  {"$sort":{"count":-1}}
],
  {allowDiskUse: true}
)

//Question 3
db.messages.update({"headers.Message-ID":"<8147308.1075851042335.JavaMail.evans@thyme>"}, {$push: {"headers.To":"mrpotatohead@mongodb.com"}})