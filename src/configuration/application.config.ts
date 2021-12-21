import {Application, Request, Response} from 'express';
import {getLogger} from '../services/logger';
import {UserRoute} from "../components/user/user.route";

const log = getLogger('application.config');

export class ApplicationConfig {
    public static registerRoute(app: Application) {
        app.get('/', function (req: Request, res: Response) {
            res.json('Hello');
        });
        app.use('/users', UserRoute); // when user do not have auth token

    }


}
