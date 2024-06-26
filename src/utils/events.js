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

function isEventToday(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function isEventFuture(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isEventPast(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

function sortByPrice(eventB, eventA) {
  return eventA.basePrice - eventB.basePrice;
}

function sortByTime(eventB, eventA) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB) ;

  return eventADuration - eventBDuration;
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isEventsRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}


export {humanizeEventDueDate, DATE_FORMAT, getDuration, getInteger, getDateDifference, isEventToday, isEventPast, isEventFuture, sortByPrice, sortByTime, isDatesEqual, isEventsRepeating};
