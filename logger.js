/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const winston = require('winston')
const mongowinston = require('winston-mongodb');
const logger = winston.createLogger({
   level: 'info',
  //level:'error',
  //lever:http
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console(),

      new winston.transports.MongoDB({
        level :'info',
        db: "mongodb://localhost:27017/test1",


      })
    ],
  });
  module.exports = logger;