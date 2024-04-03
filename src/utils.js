import dayjs from 'dayjs';

const DATE_FORMAT = 'MMMM D';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function isEventExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isEventRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}

export {getRandomArrayElement, humanizeEventDueDate, isEventExpired, isEventRepeating};
