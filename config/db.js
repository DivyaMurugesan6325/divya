/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/

const mongoose = require('mongoose');
 const dotenv = require("dotenv");
 const logger = require('../logger');
 dotenv.config();
const connection = async () =>{
     // eslint-disable-next-line no-useless-catch
     try{
         mongoose.connect(process.env.DB_URL,{
             
                useUnifiedTopology: true,
                useNewUrlParser : true,

            
      
         });
         console.log("DB Connected");

     }catch(err){
       // console.log(err);
     }
 }
 module.exports = connection;
  






