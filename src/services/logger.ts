import { config } from 'dotenv';
import * as Log4js from 'log4js';
import morgan from 'morgan';

config();

Log4js.configure({
	appenders: {
		consoleLogs: { type: 'stdout' },
		consoleLogsFiltered: {
			type: 'logLevelFilter',
			appender: 'consoleLogs',
			level: process.env.LOG_LEVEL || 'all',
		},
	},
	/*
		above there's list of appender among which to use are defined in categories.default.appenders
		there's a consoleLogsFiltered which will log to console with given log level in env
		allLogs will log everything to all.log file
		errorLogsFiltered will log 'warn' level logs to error.log file (error & warn logs will be logged to both all.log & error.log)
	*/
	categories: { default: { appenders: ['consoleLogsFiltered'], level: 'all' } },
});

export const log = Log4js.getLogger();

export function getLogger(logModuleName: string): Log4js.Logger {
	if (logModuleName) {
		return Log4js.getLogger(logModuleName);
	}
	return Log4js.getLogger();
}

log.level = process.env.LOG_LEVEL || 'all';
const morganFormat = process.env.MORGAN_LOG_FORMAT || 'dev';
export const morganInstance = morgan(morganFormat, {
	stream: {
		write: str => {
			if (str && str.split('?')[1]) {
				if (str.split('?')[1].split('=')[0] !== 'watermark') {
					log.debug(str);
				}
			} else {
				log.debug(str);
			}
		},
	},
});
