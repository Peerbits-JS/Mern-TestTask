import * as Exception from '../../utils/error-utils';
import {USER_ERROR_CODE} from './user.errors';
import {IUserForCreate} from './user.types';
import User, {IUser} from './userModel';

export const UserCreate = async (createUserObject: IUserForCreate): Promise<IUser | never> => {
    try {
        return await User.create(createUserObject);
    } catch (err) {
        if (err.code === 11000 && err.errmsg.includes('email')) {
            throw Exception.generateBadRequestError({
                exceptionCode: 'EMAIL_ADDRESS_ALREADY_EXIST',
                description: USER_ERROR_CODE.EMAIL_ADDRESS_ALREADY_EXIST,
                err,
            });
        } else {
            throw Exception.generateDatabaseError({
                exceptionCode: 'USER_ERROR_CODE',
                description: USER_ERROR_CODE.CREATE_USER_DB,
                err,
            });
        }
    }
};

