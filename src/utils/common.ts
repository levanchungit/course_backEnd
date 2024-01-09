import moment from "moment";

export const formatDateTime = (date: Date | string) => {
  return moment(date).format("DD-MM-YYYY");
};

export const getNow = () => {
  return moment().format();
};
