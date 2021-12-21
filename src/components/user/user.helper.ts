import * as Exception from '../../utils/error-utils';
import {emailRegex, NULLISH_STRING_VALUE, phoneNumberRegex} from '../components.helper';
import {ICheckValidations} from "./user.types";
import {USER_ERROR_CODE} from "./user.errors";


/**
 * it checks validations to register the user
 */
export function checkAllValidationsToRegisterUser({
                                                      phoneNumber,
                                                      firstName,
                                                      lastName,
                                                      email,
                                                  }: ICheckValidations): void {
    // email validation
    if (!emailRegex.test(email)) {
        throw Exception.generateBadRequestError({
            exceptionCode: 'INVALID_EMAIL_ADDRESS',
            description: USER_ERROR_CODE.INVALID_EMAIL_ADDRESS,
        });
    }

    // phone number validations if phone number is there
    if (!NULLISH_STRING_VALUE.includes(phoneNumber) && !phoneNumberRegex.test(phoneNumber)) {
        throw Exception.generateBadRequestError({
            exceptionCode: 'INVALID_PHONE_NUMBER',
            description: USER_ERROR_CODE.INVALID_PHONE_NUMBER,
        });
    }

    if (
        NULLISH_STRING_VALUE.includes(firstName) ||
        NULLISH_STRING_VALUE.includes(lastName)
    ) {
        throw Exception.generateBadRequestError({
            exceptionCode: 'SIGNUP_USER_BAD_REQUEST',
            description: USER_ERROR_CODE.SIGNUP_USER_BAD_REQUEST,
        });
    }
}
