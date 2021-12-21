import {IUserDocument} from './userModel';

export type IUserForCreate = Pick<IUserDocument,
    'name' | 'email' | 'password' | 'phoneNumber'>;


export type IUserDetails = Pick<IUserDocument, 'phoneNumber' | 'email'>;

export interface ICheckValidations extends IUserDetails {
    firstName: string;
    lastName: string;
}

interface newUserTemplate {
    name: string,
    email: String,
    password: string,
    link: string,
    subject: string
}
