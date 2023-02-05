import * as dateFns from "date-fns";

const formatDMY = "dd-MM-yyyy";
const fullFormatDMY = "dd-MM-yyyy HH:mm";

const Utils = {};

Utils.dateFormat = (date) => {
  if (date === undefined) return "no date";
  return dateFns.format(date, formatDMY);
};

Utils.dateFullFormat = (date) => {
  if (date === undefined) return "no date";
  return dateFns.format(date, fullFormatDMY);
};

export default Utils;
