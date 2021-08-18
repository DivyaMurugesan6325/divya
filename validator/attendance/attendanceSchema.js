const joi = require("joi");
const schema = {
     attendance2 : joi.object({

        attendance : joi.string().required(),
        userid  : joi.string().required(),
        Date  : joi.date().required(),
        entryTime : joi.string().required(),
        endTime : joi.string().required(),

     }),
     deleteAttendance : joi.object({
        id: joi.string().required()
     }),

     

}
module.exports = schema;