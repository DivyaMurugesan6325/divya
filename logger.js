/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const winston = require('winston');
const { createLogger, format, transports } = require('winston');

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


      }),

      new winston.transports.File({
        level: 'error',
        filename: 'logs/example.log',



        format:format.combine(
          format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )
  
    }),
    



    ],
  });
  module.exports = logger;