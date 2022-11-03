/**
 *
 * @param date :Date
 * @returns string of relative date compare to now
 */

export const formatTime = (date: Date): string => {
  const dateNow = new Date();
  let timeNumber: number;
  let timeType: "minutes" | "hours" | "days" | "months" | "years";

  if (
    dateNow.getFullYear() === date.getFullYear() &&
    dateNow.getMonth() === date.getMonth() &&
    dateNow.getDate() === date.getDate() &&
    dateNow.getHours() === date.getHours()
  ) {
    timeNumber = date.getMinutes() - dateNow.getMinutes();
    timeType = "minutes";
  } else if (
    dateNow.getFullYear() === date.getFullYear() &&
    dateNow.getMonth() === date.getMonth() &&
    dateNow.getDate() === date.getDate()
  ) {
    timeNumber = date.getHours() - dateNow.getHours();
    timeType = "hours";
  } else if (
    dateNow.getFullYear() === date.getFullYear() &&
    dateNow.getMonth() === date.getMonth()
  ) {
    timeNumber = date.getDate() - dateNow.getDate();
    timeType = "days";
  } else if (dateNow.getFullYear() === date.getFullYear()) {
    timeNumber = date.getMonth() - dateNow.getMonth();
    timeType = "months";
  } else {
    timeNumber = date.getFullYear() - dateNow.getFullYear();
    timeType = "years";
  }
  const time = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return time.format(timeNumber, timeType);
};
