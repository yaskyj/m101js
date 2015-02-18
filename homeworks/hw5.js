db.zips.aggregate([
  {
    $group: {
      _id: {state:"$state", city:"$city"},
      pop: {$sum:"$pop"}
    }
  },
  { 
    $match:{
      $and: [
        {pop:{$gte:25000}},{$or:[{"_id.state":"CA"}, {"_id.state":"NY"}]}
      ]
    }
  },
  {
    $group: {
      _id: null,
      avg_pop: {$avg:"$pop"}
    }  
  }
]);


db.grades.aggregate([
  {
    $unwind: "$scores"
  },
  {
    $match:{"scores.type":{$ne:"quiz"}}
  },
  {
    $group: {
      _id: {class_id:"$class_id", student_id:"$student_id"},
      average:{$avg:"$scores.score"} 
    }
  },
  {
    $group: {
          _id:"$_id.class_id",
          average:{$avg:"$average"}
    }
  },
  {
    $sort: {average:-1}
  }
]);

db.zips.aggregate([
  {
    $project: {
      first_char: {$substr: ["$city",0,1]},
      pop:1
    }
  },
  {
    $match: {
      first_char:{$regex:/[0-9]/}
    } 
  },
  {
    $group: {
      _id: null,
      sum: {$sum:"$pop"}
    }  
  }
]);