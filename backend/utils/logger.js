/**
 * Logger utility for consistent logging across the application
 */

const LogLevel = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  WARN: 'WARN',
  DEBUG: 'DEBUG'
};

const formatLog = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logObject = {
    timestamp,
    level,
    message,
    ...(data && { data })
  };
  return JSON.stringify(logObject);
};

export const logger = {
  info: (message, data) => {
    console.log(formatLog(LogLevel.INFO, message, data));
  },
  error: (message, data) => {
    console.error(formatLog(LogLevel.ERROR, message, data));
  },
  warn: (message, data) => {
    console.warn(formatLog(LogLevel.WARN, message, data));
  },
  debug: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(formatLog(LogLevel.DEBUG, message, data));
    }
  }
};
