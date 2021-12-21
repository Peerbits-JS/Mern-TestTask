export class SuccessResponse {
	public status = 'SUCCESS';

	public data;

	public description: string;

	constructor(public successCode: string, data?: any, description?: string, public statusCode: number = 200) {
		if (data) {
			this.data = data;
		}
		if (description) {
			this.description = description;
		}
	}

	static createdSuccessfully({ data, description }: { data?: any; description?: string }): SuccessResponse {
		return new SuccessResponse('CREATED_SUCCESSFULLY', data, description, 201);
	}

	static deletedSuccessfully({ data, description }: { data?: any; description?: string }): SuccessResponse {
		return new SuccessResponse('DELETED_SUCCESSFULLY', data, description);
	}

	static updatedSuccessfully({ data, description }: { data?: any; description?: string }): SuccessResponse {
		return new SuccessResponse('UPDATED_SUCCESSFULLY', data, description);
	}

	static fetchedSuccessfully({ data, description }: { data?: any; description?: string }): SuccessResponse {
		return new SuccessResponse('FETCHED_SUCCESSFULLY', data, description);
	}

	static uploadedSuccessfully({ data, description }: { data?: any; description?: string }): SuccessResponse {
		return new SuccessResponse('UPLOADED_SUCCESSFULLY', data, description);
	}
}
