import { getLogger } from '../services/logger';

const log = getLogger('error-utils');
interface IGenericError {
	exceptionCode: string;
	description?: string;
	err?: any;
}

export interface IGenericErrorReturnType {
	status: string;
	status_code: number;
	error: string;
	error_code: string;
	description: string;
	errorDetails?: any;
}

export function generateDatabaseError({
	exceptionCode,
	description = 'There was an internal error, Please try again later',
	err,
}: IGenericError): IGenericErrorReturnType {
	log.error(`${exceptionCode} : ${description} : -`, err);
	return {
		status: 'ERROR',
		status_code: 500,
		error: 'DATABASE_ERROR',
		error_code: exceptionCode,
		description,
	};
}

export function generateUnhandledError({
	exceptionCode,
	description = 'Something went wrong, please try again later',
	err,
}: IGenericError): IGenericErrorReturnType {
	log.error(`${exceptionCode} : ${description} : -`, err);
	return {
		status: 'ERROR',
		status_code: 500,
		error: 'UNHANDLED_ERROR',
		error_code: exceptionCode,
		description,
	};
}

export function generateBadRequestError({
	exceptionCode,
	description = 'Sorry, there was an error processing your request',
}: IGenericError): IGenericErrorReturnType {
	log.debug(`${exceptionCode} : ${description}`);
	return {
		status: 'ERROR',
		status_code: 400,
		error: 'BAD_REQUEST',
		error_code: exceptionCode,
		description,
	};
}
