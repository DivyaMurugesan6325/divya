const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const Message = require('../helper/constant');
const logger = require('../logger');

/** Sinup */
const signup = async (req, res) => {
    try {
          let result = await User.findOne({ email: req.body.email })
             if (result) {
                res.status(500).json({
                message: Message.successmsg3
             });
             } else {
                 bcrypt.genSalt(10, async (err, salt)=> {
                      bcrypt.hash(req.body.password, salt, async (err, hash)=> {
                             let user =  new User({
                               username: req.body.username,
                               email: req.body.email,
                               password: hash
                            });
                            const result = await  user.save()
                           console.log(result);
                           // logger.error(result);
                           logger.info(result);



                                if(result){
                                    res.status(200).json({
                                       message: Message.successmsg2,
                                       data : result
                                   }) 

                                }
                      })
                })
        }

    } catch (err) {
           res.status(500).json({
              message: err
            });
        }
}
/**login  */
const login = async(req,res) =>{
try{
    let user = await User.findOne({ email: req.body.email});
         if(user == null){
             res.status(500).json({
                 message : Message.errormsg4

            })
        } else{
                bcrypt.compare(req.body.password, user.password, async (err, result) =>{
                     if (result) {
                //token create
                         // eslint-disable-next-line no-unused-vars
                         const token =  jwt.sign({
                             //payload
                             email: user.email,
                             id: user._id,
                         // eslint-disable-next-line no-undef
                         }, process.env.JWT_KEY, { expiresIn: 60*60 }, async (err, token) => {

                             res.status(200).json({
                                 message: Message.successmsg1,
                                 token: token
                             });
                         });
                      } else {
                         res.status(401).json({
                    message: Message.errormsg1
                });
            }
        })
     }
}
catch(err){
    res.status(401).json({
        message: Message.errormsg2
    })
}
}
/** delete  */
let deleteUser = async (req,res)=>{
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(204).send();
      } catch {
        res.status(404);
        res.send({ error: Message.errormsg3 });
      }
}
//update
let updateuser = async(req,res)=>{
    try {
        const post = await User.findOne({ _id: req.params.id });
         if (req.body.username) {
          post.username = req.body.username;
        }
        if (req.body.email) {
          post.email = req.body.email;
        }
        if (req.body.pasword) {
            post.password = req.body.password;
          }
       await post.save();
        res.send(post);
      } catch {
        res.status(404);
        res.send({ error: Message.errormsg3 });
      }
   } 
//getuserbyid
let  findbyiduser = async(req,res) =>{   
    try{  
        const post = await User.findOne({ _id: req.params.id });       
        res.send(post);        
    }catch(error){                   
        res.status(404);   
        res.send({err : error})         
    }      
}       


const findAllUser = async(req,res)=>{
    try{
        let result = await  User.find();
            if(result){
              res.status(200).json({
               "result": result
               })
            }
        }
catch(err){
    res.status(500).json({
        "error":err
    })
}
}
module.exports = {
    signup,
    login,
    deleteUser,
    findbyiduser,
    updateuser,
    findAllUser
}