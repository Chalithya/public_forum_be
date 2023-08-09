const moment = require('moment');

const log = (level, message, instance = null) => {
  const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss');
  console.log(`[${level}][${timestamp}]${instance ? `[${instance}]` : ''} ${message}`);
};

module.exports = {
  info: (message, instance) => log('INFO', message, instance),
  warn: (message, instance) => log('WARN', message, instance),
  error: (message, instance) => log('ERROR', message, instance),
};
