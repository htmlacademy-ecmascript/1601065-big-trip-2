import {getRandomArrayElement} from '../utils.js';
import {PLACE, TRANSPORT, OFFERS} from '../const.js';

const mockEvents = [
  {
    description: 'Путь',
    dueDate: new Date('2014-01-01'),
    img: '1' ,
    time: '2',
    price: '3',
    star: {
      active: true,
      notActive: false,
    },
    place: getRandomArrayElement(PLACE),
    transport: getRandomArrayElement(TRANSPORT),
    offers: getRandomArrayElement(OFFERS),
  },
  {
    description: 'Путь',
    dueDate: new Date('2014-01-01'),
    img: '2',
    time: '6',
    price: '9',
    star: {
      active: true,
      notActive: false,
    },
    place: getRandomArrayElement(PLACE),
    transport: getRandomArrayElement(TRANSPORT),
    offers: getRandomArrayElement(OFFERS),
  },
  {
    description: 'Путь',
    dueDate: new Date('2014-01-01'),
    img: '9',
    time: '9',
    price: '9',
    star: {
      active: true,
      notActive: false,
    },
    place: getRandomArrayElement(PLACE),
    transport: getRandomArrayElement(TRANSPORT),
    offers: getRandomArrayElement(OFFERS),
  },
];

function getRandomTask() {
  return getRandomArrayElement(mockEvents);
}

export {getRandomTask};
