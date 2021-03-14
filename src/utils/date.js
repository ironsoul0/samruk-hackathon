import dateFnsFormat from "date-fns/format";

export const getNextDay = () => {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  return tomorrow;
};

export const formatDate = (date) => {
  return dateFnsFormat(date, "yyyy-MM-dd");
};
