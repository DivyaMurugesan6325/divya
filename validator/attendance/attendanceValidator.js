const {attendance2} = require("./attendanceSchema");
const {deleteAttendance }= require('./attendanceSchema');
const schemaAttendance = async(req,res,next) =>{
     const value =  await  attendance2.validate(req.body);
     if(value.error){
         res.json({
            success : 0,
            message : value.error.details[0].message
        
         })
     }else{
         next();
     }

}

const     Attendancedelete = async(req,res,next)=>{
    const value = await deleteAttendance.validate(req.body);
    if(value.error){
        res.json({
            success :0,
            message : value.error.details[0].message
        })
    }else{
        next();
    }
}
module.exports ={
    schemaAttendance,
    Attendancedelete
}