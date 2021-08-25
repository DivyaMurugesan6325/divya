/* eslint-disable no-unused-vars */
const con = require('./config/db');
const express =require('express');
const helmet = require('helmet');
const index = require('./routes/index');
const userrou = require('./routes/user');
//const logger = require('./logger');
//const logger =require('./winston');
//const morgan = require('morgan');
const pino = require('pino-http')()



/**db connection */
con();
const app = express();
/** middlewares */


app.use(helmet()); 
// eslint-disable-next-line no-undef
    
app.use(express.json());
app.use(pino)

app.use('/user',userrou);
app.use(express.urlencoded({ extended: true }));



/**routes*/
// eslint-disable-next-line no-undef
//app.use(morgan())
//app.use(morgan('tiny'));

app.use('/',index);
//logger.error("This is an error log")
//logger.warn("This is an error log")
//logger.info('this is info');



// eslint-disable-next-line no-undef
app.listen(process.env.PORT);
module.exports = app;