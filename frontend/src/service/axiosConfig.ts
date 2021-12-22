import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "https://www.gov.uk"
});

instance.interceptors.request.use(req => {
  return req;
});

instance.interceptors.response.use(res => {
  try {
    if (res.status === 200) {
      // toast.success("Request Success");
      return res;
    } else {
      toast.error(res.data.data.message);
    }
  } catch (err) {
    toast.error(res.data.data.message);
  }
  return res;
});

export default instance;
