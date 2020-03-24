import moment from "moment";

export const dateFormat = ({ date, format }) => {
  if (!date) {
    return "";
  }
  return moment(Date(date)).format(format);
};
