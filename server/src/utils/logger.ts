import winston, { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const {
  combine,
  timestamp,
  label,
  printf,
  colorize,
  json,
  prettyPrint,
  errors,
} = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    enrichment: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    enrichment: 'magenta',
  },
};

winston.addColors(customLevels.colors);

const customFormat = printf(
  ({ level, message, label, timestamp, meta, stack }) => {
    const formattedMeta = meta ? ` ${JSON.stringify(meta)}` : '';
    const logMessage = `${timestamp} [${label}] ${level}: ${message}${formattedMeta}`;
    if (stack) {
      const stackInfo =
        stack instanceof Error ? stack.stack : new Error(stack).stack;
      return `${logMessage}\n${stackInfo}`;
    } else {
      return logMessage;
    }
  },
);

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: combine(
    errors({ stack: true }),
    json(),
    prettyPrint(),
    label({ label: 'backend' }),
    timestamp({
      format: () => {
        return new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
        });
      },
    }),
    colorize({
      all: true,
    }),
    customFormat,
  ),
  transports: [
    new transports.Console({
      level: 'enrichment',
    }),
    new transports.DailyRotateFile({
      filename: './logs/errors/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
    }),
    new transports.DailyRotateFile({
      filename: './logs/combined/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
});

export default logger;
