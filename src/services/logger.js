"use strict";
exports.__esModule = true;
exports.morganInstance = exports.getLogger = exports.log = void 0;
var dotenv_1 = require("dotenv");
var Log4js = require("log4js");
var morgan_1 = require("morgan");
dotenv_1.config();
Log4js.configure({
    appenders: {
        consoleLogs: { type: 'stdout' },
        consoleLogsFiltered: {
            type: 'logLevelFilter',
            appender: 'consoleLogs',
            level: process.env.LOG_LEVEL || 'all'
        }
    },
    /*
        above there's list of appender among which to use are defined in categories.default.appenders
        there's a consoleLogsFiltered which will log to console with given log level in env
        allLogs will log everything to all.log file
        errorLogsFiltered will log 'warn' level logs to error.log file (error & warn logs will be logged to both all.log & error.log)
    */
    categories: { "default": { appenders: ['consoleLogsFiltered'], level: 'all' } }
});
exports.log = Log4js.getLogger();
function getLogger(logModuleName) {
    if (logModuleName) {
        return Log4js.getLogger(logModuleName);
    }
    return Log4js.getLogger();
}
exports.getLogger = getLogger;
exports.log.level = process.env.LOG_LEVEL || 'all';
var morganFormat = process.env.MORGAN_LOG_FORMAT || 'dev';
exports.morganInstance = morgan_1["default"](morganFormat, {
    stream: {
        write: function (str) {
            if (str && str.split('?')[1]) {
                if (str.split('?')[1].split('=')[0] !== 'watermark') {
                    exports.log.debug(str);
                }
            }
            else {
                exports.log.debug(str);
            }
        }
    }
});
