import {getRandomArrayElement} from '../utils.js';
import {EVENT_TYPES, ID, TITLE, PRICE} from '../const.js';

const mockEvent = [
  {
    type: getRandomArrayElement(EVENT_TYPES),
    offers: [
      {
        id: getRandomArrayElement(ID),
        title: getRandomArrayElement(TITLE),
        price: getRandomArrayElement(PRICE)
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENT_TYPES),
    offers: [
      {
        id: getRandomArrayElement(ID),
        title: getRandomArrayElement(TITLE),
        price: getRandomArrayElement(PRICE)
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENT_TYPES),
    offers: [
      {
        id: getRandomArrayElement(ID),
        title: getRandomArrayElement(TITLE),
        price: getRandomArrayElement(PRICE)
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENT_TYPES),
    offers: [
      {
        id: getRandomArrayElement(ID),
        title: getRandomArrayElement(TITLE),
        price: getRandomArrayElement(PRICE)
      }
    ]
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

function getRandomEventOffers() {
  return getRandomArrayElement(mockEvent);
}

export {getRandomEventOffers};
