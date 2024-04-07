import {createElement} from '../render.js';
import { getDuration, getInteger } from '../utils.js';
import dayjs from 'dayjs';

function createEventTemplate(event, offers, destinations) {
  const { isFavorite, basePrice, dateFrom, dateTo, type} = event;
  const typeOffers = offers.find((index) => index.type === event.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => event.offers.includes(typeOffer.id));
  const pointDestinations = destinations.find((index) => index.destinations === event.destinations);
  const fromTime = dayjs(dateFrom).format('HH:mm');
  const toTime = dayjs(dateTo).format('HH:mm');
  const difference = getDuration(dateFrom, dateTo);
  const days = difference.format('D');
  const hours = difference.format('HH');
  const minutes = difference.format('mm');
  const daysTemplate = getInteger(days) ? `${days}D` : '';
  const hoursTemplate = !(getInteger(days) || getInteger(hours)) ? '' : `${hours}H`;
  const minutesTemplate = `${minutes}M`;


  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime= ${dateFrom}>${dayjs(dateFrom).format('MMMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestinations.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dateFrom}>${fromTime}</time>
            &mdash;
            <time class="event__end-time" datetime=${dateTo}>${toTime}</time>
          </p>
          <p class="event__duration"> ${daysTemplate} ${hoursTemplate} ${minutesTemplate}
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${pointOffers.map((offer) =>
      `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('')}

        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
  </li>`
  );
}

export default class EventView {
  constructor({event, offers, destinations}) {
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventTemplate(this.event, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
