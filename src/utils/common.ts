import moment from "moment";

export const formatDateTime = (date: Date | string) => {
  return moment(date).format("DD-MM-YYYY");
};

export const getNow = () => {
  return moment().format();
};

//get date + time
export const getDateTime = () => {
  return moment().format("DD-MM-YYYY HH:mm:ss");
};
