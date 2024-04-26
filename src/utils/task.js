import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DATE_FORMAT = 'MMMM D HH:mm';

function humanizeEventDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

const getInteger = (string) => parseInt(string, 10);

const getDuration = (startDate, endDate) => dayjs.duration(dayjs(endDate).diff(dayjs(startDate)));

const getDateDifference = (dateFrom, dateTo) => {
  const difference = getDuration(dateFrom, dateTo);
  const days = difference.format('D');
  const hours = difference.format('HH');
  const minutes = difference.format('mm');
  const daysTemplate = getInteger(days) ? `${days}D` : '';
  const hoursTemplate = !(getInteger(days) || getInteger(hours)) ? '' : `${hours}H`;
  const minutesTemplate = `${minutes}M`;

  return `${daysTemplate} ${hoursTemplate} ${minutesTemplate}`;
};

export {humanizeEventDueDate, DATE_FORMAT, getDuration, getInteger, getDateDifference};
