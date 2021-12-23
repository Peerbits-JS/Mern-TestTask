import axios from "./axiosConfig";

export const METHOD = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch"
};

export const apiCall = (
  endpoint: string,
  params = {},
  onSuccess: Function,
  onFailure: Function,
  method = METHOD.GET,
  DyanamicConfig = {}
) => {
  const request = (): Promise<any> => {
    switch (method) {
      case METHOD.POST:
        return axios.post(endpoint, params, { ...DyanamicConfig });
      case METHOD.GET:
        return axios.get(endpoint, { ...DyanamicConfig });
      case METHOD.DELETE:
        return axios.delete(endpoint, { ...DyanamicConfig });
      case METHOD.PUT:
        return axios.put(endpoint, params, { ...DyanamicConfig });
      case METHOD.PATCH:
        return axios.patch(endpoint, params, { ...DyanamicConfig });
    }
    return new Promise((resolve, reject) => resolve({}));// axios.post<User[]>(endpoint, params, { ...DyanamicConfig });
  };

  const req = request();

  req.then(response => {
    if (response.status === 200 || response.status === 201 || response.status === 204 || response.data || response.authOutput) {
      onSuccess(response.data);
    } else {
      onFailure("Something went wrong");
    }
  }).catch(error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          onFailure(
            error.response.data && typeof error.response.data.detail
              ? error.response.data.detail
              : "Session expired"
          );
          break;

        default:
          onFailure(error.response.data ? error.response.data : "Something went wrong");
          break;
      }
    } else onFailure && onFailure("Something went wrong");
  });
};
