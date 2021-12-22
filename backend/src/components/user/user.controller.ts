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
import {ICheckValidations, IUserForCreate} from "./user.types";

const log = getLogger('user.controller');

class UserController {
    /*
     User functionality */
    /** signUpNewUser new user its used to setup new User
     * @param req
     * @param res
     */
    public async signUpNewUser(req: Request, res: Response): Promise<Response> {
        const {phoneNumber, firstName, lastName, email}: ICheckValidations = req.body;
        try {
            const randomPassword: string = crypto.randomBytes(64).toString('base64').slice(0, 14);
            checkAllValidationsToRegisterUser({phoneNumber, firstName, lastName, email});
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
            mailSend(sendMessage).catch(err => {
                log.error('User : signUpNewUser : Mailer Error ', err);
            });
            const response = SuccessResponse.createdSuccessfully({
                data: {
                    _id: userData._id,
                },
                description: 'Registered user Successfully',
            });
            return res.status(response.statusCode).json(response);
        } catch (err) {
            log.error("signUpNewUser: ", err)
            if (err && err.status_code) {
                return res.status(err.status_code).json(err);
            }
            const exception = Exception.generateUnhandledError({
                exceptionCode: 'SIGNUP_USER_UNHANDLED',
                description: USER_ERROR_CODE.SIGNUP_USER_UNHANDLED,
                err,
            });
            return res.status(exception.status_code).json(exception);
        }
    }
}

export const userClassObj = new UserController();
