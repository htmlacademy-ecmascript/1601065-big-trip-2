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

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortEventsUp(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
}

function sortEventDown(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
}

export {humanizeEventDueDate, DATE_FORMAT, getDuration, getInteger, getDateDifference, isEventToday, isEventPast, isEventFuture, sortEventDown, sortEventsUp};
