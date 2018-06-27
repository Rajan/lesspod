const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const os = require('os');
const path = require('path');

const logFileName = 'logs.log';
const logLocation = path.join(process.cwd(), '/logs/');
module.exports = winston => {
  const logFormatter = args => {
    const logMessage = `${new Date().toISOString()} | ${args.level.toUpperCase()} | ${os.hostname()} | ${
      args.message
    }`;
    return logMessage;
  };
  if (!fs.existsSync(logLocation)) {
    fs.mkdirSync(logLocation);
  }
  winston.add(DailyRotateFile, {
    filename: path.join(logLocation, logFileName),
    datePattern: 'DD-MM-YYYY',
    prepend: true,
    prettyPrint: true,
    // formatter: logFormatter,
    handleExceptions: true,
    exitOnError: false,
    json: false,
    level: 'debug',
  });
  // winston.remove(winston.transports.Console);
};
