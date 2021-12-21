import {Router} from 'express';
import {userClassObj} from './user.controller';

export const UserRoute = Router({
    strict: false,
});

// signup new bot developer
UserRoute.post('/', userClassObj.signUpNewUser);
