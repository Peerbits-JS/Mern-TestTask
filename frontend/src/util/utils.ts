// import axios from "axios";
import moment from "moment";

export const getFromAndToDate = (days: number) => {
  const fromDate = moment(new Date()).format("YYYY-MM-DD");
  const toDate = moment().subtract(days, "days").format("YYYY-MM-DD");
  return { fromDate, toDate };
};

export const formatDate = (date: any, format = "YYYY-MM-DD") => {
  const dat = new Date(date);
  return moment(dat).format(format);
};
