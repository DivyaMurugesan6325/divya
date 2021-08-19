/* eslint-disable no-unused-vars */
const con = require('./config/db');
const express =require('express');
const helmet = require('helmet');
const index = require('./routes/index');
const userrou = require('./routes/user');
const logger = require('./logger');

/**db connection */
con();
const app = express();
/** middlewares */


app.use(helmet()); 

    
app.use(express.json());
app.use('/user',userrou);
app.use(express.urlencoded({ extended: true }));



/**routes*/

app.use('/',index);



// eslint-disable-next-line no-undef
app.listen(process.env.PORT);
//logger.error("working");
module.exports = app;