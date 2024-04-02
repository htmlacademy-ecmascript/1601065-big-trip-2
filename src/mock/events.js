import {getRandomArrayElement} from '../utils.js';
import {ID, DESCRIPTION, NAME, SRC, DESCRIPTION_IMG } from '../const.js';

const mockEvents = [
  {
    id: getRandomArrayElement(ID),
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(NAME),
    pictures: [
      {
        src: getRandomArrayElement(SRC),
        description: getRandomArrayElement(DESCRIPTION_IMG)
      }]
  },

  // {
  //   description: 'Путь',
  //   dueDate: new Date('2014-01-01'),
  //   img: '9',
  //   time: '9',
  //   price: '9',
  //   star: {
  //     active: true,
  //     notActive: false,
  //   },
  //   eventTypes: getRandomArrayElement(EVENT_TYPES),
  //   offers: getRandomArrayElement(OFFERS),
  // },
];

function getRandomEvent() {
  return getRandomArrayElement(mockEvents);
}

export {getRandomEvent};
