const winston = require('winston');
//const winstonmongodb = require('winston-mongodb');
const { transports, format, createLogger } = winston
const { combine, printf } = format

// Create a timeStamp 
const logTime = new Date().toLocaleDateString()
// Crate a custom log
const customLog = printf(({ level, message ,info}) => {
    return `Level:[${ level }]  info:[${ info }]  LogTime: [${ logTime }] Message:-[${ message }]`
})
const date = new Date()
const newdate = `${ date.getDate() }-${ date.getMonth() }-${ date.getFullYear() }`
const options = {
    info: {
        level: 'info',
        dirname: 'logs/combibned',
        json: true,
        handleExceptions: true,
        maxSize: '10',
        filename: `combined-${ newdate }.log`,
        datePattern: 'YYYY-MM-DD-HH',
    }, dbinfo: {
        level: "info",
        collection: "user",
        // eslint-disable-next-line no-undef
        db: process.env.DB_URL,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        maxsize: 52428800, // 50MB
    },
    error: {
        level: 'error',
        dirname: 'logs/error',
        json: true,
        handleExceptions: true,
        filename: `error-${ newdate }.log`,
    },
    console: {
        level: 'debug',
        json: false,
        handleExceptions: true,
        colorize: true,
    },
}

const logger = new createLogger({
    format: combine(customLog), transports: [
        new transports.File(options.info),
        new transports.File(options.error),
        new transports.MongoDB(options.dbinfo),
        new transports.Console(options.console)
    ], exitOnError: false
})

module.exports = logger
 