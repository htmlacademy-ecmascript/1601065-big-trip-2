import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
const capitalizeFirstLetter = (string) => string.charAt(0)
  .toUpperCase() + string.slice(1);

const isFuturePoint = (dateFrom) => dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));


export {getRandomArrayElement, capitalizeFirstLetter, isFuturePoint};
