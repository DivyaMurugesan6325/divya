const  mongoose = require("mongoose");

const  Attendance =  mongoose.Schema({
userid : {
        type : String
    },
     date : {
         type : Date
     },
    entryTime : {
            type : String
     },
    endTime : {
         type : String
     }, 
     att : {
        type : String
    },
})
module.exports = mongoose.model("Attendance", Attendance);