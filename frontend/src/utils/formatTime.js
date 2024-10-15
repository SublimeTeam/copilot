import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const formatDate = (date, format = "DD/MM/YYYY HH:mm:ss") => {
  const pastDate = dayjs(date, format);

  const diff = pastDate.diff(dayjs());

  const duration = dayjs.duration(diff);

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  let formattedTime = [];

  if (days > 0) {
    // Return the date in dd/mm/yyyy format if days have passed
    formattedTime = pastDate.format("DD/MM/YYYY");
  } else {
    // Format the time for hours and minutes
    const timeParts = [];
    if (hours > 0) {
      timeParts.push(`${hours}h`);
    }
    if (minutes > 0 || hours === 0) {
      timeParts.push(`${minutes}m`);
    }
    formattedTime = timeParts.join(" ");
  }

  return formattedTime;
};
