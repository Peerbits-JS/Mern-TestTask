import {log, morganInstance} from './services/logger';
import mongoose from "mongoose";
import http from "http";
import express from "express";
import cors from 'cors';
import {config} from 'dotenv';
import {Config} from './configuration/config';
import {ApplicationConfig} from './configuration/application.config';


config();

const {PORT, mongoDBConnectionUrl: mongoUrl} = Config.server;
const BODY_PAYLOAD_LIMIT = 100 * 100000; // 1 MB

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        const server = http.createServer(this.app);
        server.listen(PORT, () => {
            log.warn('Server is running on port ', PORT);
        });
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(morganInstance);
        this.app.use(
            cors({
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
                credentials: true,
            }),
        );
        this.app.use(express.json({limit: BODY_PAYLOAD_LIMIT}));
        this.app.use(express.urlencoded({extended: false, limit: BODY_PAYLOAD_LIMIT}));

        // Register Routers.
        ApplicationConfig.registerRoute(this.app);
    }

    private mongoSetup(): void {
        mongoose.connection.on('connected', () => {
            log.info('DATABASE - Connected');
        });

        mongoose.connection.on('error', err => {
            log.error(`DATABASE - Error:${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            log.warn('DATABASE - disconnected  Retrying....');
        });
        const dbOptions: mongoose.ConnectOptions = {
            w: 'majority',
            dbName: Config.server.DB_NAME,
        };
        mongoose
            .connect(
                mongoUrl,
                dbOptions,
            )
            .catch(err => {
                log.fatal(`DATABASE - Error:${err}`);
            });
    }

}

// Start Application.
export const appInstance = new App();
