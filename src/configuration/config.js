"use strict";
exports.__esModule = true;
exports.Config = void 0;
var dotenv_1 = require("dotenv");
var logger_1 = require("../services/logger");
var fs = require("fs");
dotenv_1.config();
// JWT PRIVATE and PUBLIC key for Auth token
var privateKeyToSignJWT = fs.readFileSync('../auth_keys/jwtPrivate.key', 'utf8'); // readFileSync will read path from project's root (process.cwd())
var publicKeyToVerifyJWT = fs.readFileSync('../auth_keys/jwtPublic.key', 'utf8'); // utf8 option will read file as string and not as buffer
exports.Config = {
    /** common type variable to use wherever we want to do logic based on server environment
     * other possible values = 'local', 'development', 'staging', 'production';
     */
    SERVER_ENV: process.env.SERVER_ENV || 'local',
    jwtAuthentication: {
        privateKeyToSignJWT: privateKeyToSignJWT,
        publicKeyToVerifyJWT: publicKeyToVerifyJWT,
        signOptions: {
            expiresIn: '3d',
            algorithm: 'RS256'
        },
        signOptionsForForgetToken: {
            expiresIn: '15m',
            algorithm: 'RS256'
        }
    },
    mailer: {
        sender: process.env.MAIL_SENDER,
        key: process.env.SGT_MAILER_KEY
    },
    server: {
        PORT: parseInt(process.env.PORT, 10) || 3500,
        SOCKET_PORT: parseInt(process.env.SOCKET_PORT, 10) || 3700,
        mongoDBConnectionUrl: process.env.DB_URL,
        DB_NAME: process.env.DB_NAME
    }
};
/*
    Validations for required field in ENV
*/
if (!exports.Config.server.mongoDBConnectionUrl) {
    logger_1.log.fatal('config : mongo db connection URL not set in env file');
    process.exit();
}
if (!exports.Config.server.DB_NAME) {
    logger_1.log.fatal('config : database name is not defined for SAAS');
    process.exit();
}
if (!exports.Config.mailer || !exports.Config.mailer.key || !exports.Config.mailer.sender) {
    logger_1.log.fatal('mailer : mailer configuration not set in ENV file ', JSON.stringify(exports.Config.mailer, null, 2));
    process.exit();
}
