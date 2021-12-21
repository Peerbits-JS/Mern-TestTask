import crypto from 'crypto';
import {Request, Response} from 'express';
import {mailSend} from '../../helpers/mailer';
import {newUser} from '../../helpers/mailerTemplate';
import {getLogger} from '../../services/logger';
import * as Exception from '../../utils/error-utils';
import {SuccessResponse} from '../../utils/success-utils';
import {UserCreate,} from './user.DAL';
import {USER_ERROR_CODE} from './user.errors';
import {
    checkAllValidationsToRegisterUser,
} from './user.helper';
import {IUserForCreate} from "./user.types";

const log = getLogger('user.controller');

class UserController {
    /*
     Agent Sign in functionality */

    /** signUpNewUser new user its used to setup new User
     * @param req
     * @param res
     */
    public async signUpNewUser(req: Request, res: Response): Promise<void> {
        const {phoneNumber, firstName, lastName, email} = req.body;
        try {
            const randomPassword = crypto.randomBytes(64).toString('base64').slice(0, 14);
            await checkAllValidationsToRegisterUser({phoneNumber, firstName, lastName, email});
            const user: IUserForCreate = {
                phoneNumber,
                name: {
                    first: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
                    last: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
                },
                email,
                password: randomPassword,
            };
            const userData = await UserCreate(user);
            const sendMessage = newUser(
                {
                    name: `${user.name.first} ${user.name.last}`,
                    email,
                    link: "#",
                    password: randomPassword,
                    subject: "New User Register"
                }
            );
            let isMailSent = true;
            await mailSend(sendMessage).catch(err => {
                isMailSent = false;
                log.error('User : signUpNewBotDeveloper : Mailer Error ', err);
            });
            log.info('signUpNewBotDeveloper : mail sent Successfully email ', user.email);
            const response = SuccessResponse.createdSuccessfully({
                data: {
                    _id: userData._id,
                    isMailSent,
                },
                description: 'Registered user Successfully',
            });
            res.status(response.statusCode).json(response);
        } catch (err) {
            if (err && err.status_code) {
                res.status(err.status_code).json(err);
                return;
            }
            const exception = Exception.generateUnhandledError({
                exceptionCode: 'SIGNUP_USER_UNHANDLED',
                description: USER_ERROR_CODE.SIGNUP_USER_UNHANDLED,
                err,
            });
            res.status(exception.status_code).json(exception);
        }
    }
}

export const userClassObj = new UserController();
