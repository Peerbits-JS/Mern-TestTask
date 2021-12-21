/**
 * Shared helper function between all components for common methods and variables
 */

export const NULLISH_STRING_VALUE = ['', null, undefined];

// regex for validations
export const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
export const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
/**
 * Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
 */
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;


/*
* All Database model name define here
* */
export enum ModelEnum {
    USER = 'User',
}
