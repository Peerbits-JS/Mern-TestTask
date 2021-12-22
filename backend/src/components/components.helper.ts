/**
 * Shared helper function between all components for common methods and variables
 */

export const NULLISH_STRING_VALUE = ['', null, undefined];

// regex for validations
export const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
export const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

/*
* All Database model name define here
* */
export enum ModelEnum {
    USER = 'User',
}
