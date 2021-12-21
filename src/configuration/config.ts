import { config } from 'dotenv';
import { log } from '../services/logger';
import * as fs from "fs";

config();

export const Config = {
	/** common type variable to use wherever we want to do logic based on server environment
	 * other possible values = 'local', 'development', 'staging', 'production';
	 */
	SERVER_ENV: process.env.SERVER_ENV || 'local',
	mailer: {
		sender: process.env.MAIL_SENDER,
		key: process.env.SGT_MAILER_KEY,
	},
	server: {
		PORT: parseInt(process.env.PORT, 10) || 3500,
		mongoDBConnectionUrl: process.env.DB_URL, // db connection string for saas
		DB_NAME: process.env.DB_NAME, // saas db name; it can also be used in any other process/app (rn it's being used for intent service checker service)
	},
};

/*
	Validations for required field in ENV
*/

if (!Config.server.mongoDBConnectionUrl) {
	log.fatal('config : mongo db connection URL not set in env file');
	process.exit();
}

if (!Config.server.DB_NAME) {
	log.fatal('config : database name is not defined for SAAS');
	process.exit();
}

if (!Config.mailer || !Config.mailer.key || !Config.mailer.sender) {
	log.fatal('mailer : mailer configuration not set in ENV file ', JSON.stringify(Config.mailer, null, 2));
	process.exit();
}
