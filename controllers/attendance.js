/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const  Attendance = require("../models/attendance");
const Message = require('../helper/constant') ;
const postAttendance = async(req,res)=>{
    try{// eslint-disable-next-line no-undef
        const post = new Attendance({userid,date,entryTime,endTime,att }=req.body);
          await post.save();
          res.status(200).json({
              message :"success",
              data : post
          })
        }catch(error){
                res.status(500).json({
                    err : error
                })
    }
}

const findAllAttendance = async(req,res)=>{
    try{
        let result = await  Attendance.find();
            if(result){
              res.status(200).json({
               "result": result
               })
            }
        }
catch(err){
    res.send(err)
}
}
/**findbyid */
let  findAttendanceByid = async(req,res) =>{   
    try{  
        const post = await Attendance.findOne({ _id: req.params.id });       
        res.send(post);        
    }catch(error){                   
        res.status(404);   
        res.send({err : error})         
    }      
}       

    const update = async(req,res)=>{
        try{
            const post = await Attendance.findOne({ _id: req.params.id });
            if (req.body.userid) {
                post.userid = req.body.userid;
              }
              if (req.body.date) {
                post.date = req.body.date;
              }
              if (req.body.entryTime) {
                post.entryTime = req.body.entryTime;
              }
              if (req.body.endTime) {
                post.endTime= req.body.endTime;
              }
              if (req.body.att ) {
                post.att = req.body.att ;
              }
        await post.save();
           res.send(post);
        }catch(error){
              res.send(error)
        }
    }
    let deletePost = async (req,res)=>{
            try {
                await Attendance.deleteOne({ _id: req.params.id });
                res.status(204).send();
              } catch {
                res.status(404);
                res.send({ error: Message.errormsg3 });
              }
        }
    
    





module.exports = {
   postAttendance,
    findAllAttendance,
    findAttendanceByid ,
        update,
    deletePost
}