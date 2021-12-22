// import axios from "axios";
import moment from "moment";

export const valiadteToken = () => {
  const token = getToken();
  if (token) {
    return true;
  }
  return false;
};

export const getToken = () => {
  console.log("process.env.AUTH_TOKEN", process.env.AUTH_TOKEN);
  return localStorage.getItem(process.env.AUTH_TOKEN || "login-auth-token");
};

export const setToken = (key: string, token: string) => {
  localStorage.setItem(key, token);
};

// export const getPostData = async () => {
//   const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   const { data } = response;
//   console.log(response);
//   return data;
//   // });
// };

export const getFromAndToDate = (days: number) => {
  const fromDate = moment(new Date()).format("YYYY-MM-DD");
  const toDate = moment().subtract(days, "days").format("YYYY-MM-DD");
  return { fromDate, toDate };
};

export const formatDate = (date: any, format = "YYYY-MM-DD") => {
  const dat = new Date(date);
  // const format = 'DD/MM/yyyy';
  // const format1 = 'YYYY-MM-DD';
  // console.log("DAte FORMATED", moment(date).format(format));
  return moment(dat).format(format);
};
