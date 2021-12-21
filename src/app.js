"use strict";
exports.__esModule = true;
exports.appInstance = void 0;
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var http_1 = require("http");
var mongoose_1 = require("mongoose");
var config_1 = require("./configuration/config");
var application_config_1 = require("./configuration/application.config");
var logger_1 = require("./services/logger");
dotenv_1.config();
var _a = config_1.Config.server, PORT = _a.PORT, SOCKET_PORT = _a.SOCKET_PORT, mongoUrl = _a.mongoDBConnectionUrl;
var isLocalServer = !!(config_1.Config.SERVER_ENV && config_1.Config.SERVER_ENV === 'local');
var BODY_PAYLOAD_LIMIT = 100 * 100000; // 1 MB
var App = /** @class */ (function () {
    function App() {
        this.wsMap = new Map();
        this.app = express_1["default"]();
        var server = http_1["default"].createServer(this.app);
        /* socket server for backoffice-saas data transfer like notifications etc. */
        var socketServer = http_1["default"].createServer(this.app);
        socketServer.listen(SOCKET_PORT, function () {
            logger_1.log.info('Socket Server is running on port ', SOCKET_PORT);
        });
        server.listen(PORT, function () {
            logger_1.log.warn('Server is running on port ', PORT);
        });
        this.config();
        this.mongoSetup();
    }
    App.prototype.config = function () {
        this.app.use(logger_1.morganInstance);
        this.app.use(cors_1["default"]({
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: [
                'Origin',
                ' X-Requested-With',
                ' Content-Type',
                ' Accept ',
                ' Authorization',
                'x-ms-bot-agent',
                'User-Agent',
            ],
            credentials: true
        }));
        this.app.use(express_1["default"].json({ limit: BODY_PAYLOAD_LIMIT }));
        this.app.use(express_1["default"].urlencoded({ extended: false, limit: BODY_PAYLOAD_LIMIT }));
        // Register Routers.
        application_config_1.ApplicationConfig.registerRoute(this.app);
    };
    App.prototype.mongoSetup = function () {
        mongoose_1["default"].connection.on('connected', function () {
            logger_1.log.info('DATABASE - Connected');
        });
        mongoose_1["default"].connection.on('error', function (err) {
            logger_1.log.error("DATABASE - Error:" + err);
        });
        mongoose_1["default"].connection.on('disconnected', function () {
            logger_1.log.warn('DATABASE - disconnected  Retrying....');
        });
        var dbOptions = {
            reconnectTries: Number.MAX_SAFE_INTEGER,
            reconnectInterval: 500,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            authSource: 'admin',
            w: 'majority',
            dbName: config_1.Config.server.DB_NAME
        };
        mongoose_1["default"]
            .connect(mongoUrl, dbOptions)["catch"](function (err) {
            logger_1.log.fatal("DATABASE - Error:" + err);
        });
    };
    return App;
}());
// Start Application.
exports.appInstance = new App();
