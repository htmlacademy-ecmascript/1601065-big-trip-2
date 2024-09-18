import dayjs from 'dayjs';

const getWeightForNullParam = (a, b) => {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return null;
};

const sortDate = (eventA, eventB) => {
  const weight = getWeightForNullParam(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
};

const sortPrice = (eventA, eventB) => {
  const weight = getWeightForNullParam(eventA.totalPrice, eventB.totalPrice);

  return weight ?? eventB.totalPrice - eventA.totalPrice;
};

const getOffersByType = (event, eventCommon) => eventCommon.allOffers.find((offerTypes) => offerTypes.type === event.type).offers;

const calculateTotalPrice = (event, eventCommon) => {
  let price = event.basePrice;
  const offersByType = getOffersByType(event, eventCommon);
  event.selectedOffers.map((selectedOfferId) => {
    const offerPrice = offersByType.find((offer) => offer.id === selectedOfferId).price;
    price += offerPrice;
  });
  return price;
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


const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export { sortDate, sortPrice, getOffersByType, calculateTotalPrice, isDatesEqual, isEventFuture, isEventPast, isEventToday };
