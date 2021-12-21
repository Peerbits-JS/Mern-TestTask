import {Router} from 'express';
import {userClassObj} from './user.controller';

export const UserRoute = Router({
    strict: false,
});

// signup new user
UserRoute.post('/', userClassObj.signUpNewUser);
