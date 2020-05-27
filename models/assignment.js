var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var AssignmentSchema = new mongoose.Schema({
  class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom"
  },
  assignment: {
   type: String,
   required: false
  },
  solution: {
     studentId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
     },
     fileName: {
       type: String,
       required: false
     }
 }
});


module.exports = mongoose.model("Assignment", AssignmentSchema);