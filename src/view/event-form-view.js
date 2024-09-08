import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENT_TYPES } from '../const.js';
import dayjs from 'dayjs';
import { capitalizeFirstLetter } from '../utils/common.js';
import { getOffersByType } from '../utils/events.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 1,
  destId: -1,
  selectedOffers: [],
  type: EVENT_TYPES[0],
};

const createEventEditEventTypeItemsTemplate = () => EVENT_TYPES.map((eventType, i) => `
    <div class="event__type-item">
      <input id="event-type-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${i}">${capitalizeFirstLetter(eventType)}</label>
    </div>
    `)
  .join('');

const createEventEditOffersTemplate = (data, eventCommon) => {
  const offersMarkup = getOffersByType(data, eventCommon).map((offer, i) => {
    const checked = data.selectedOffers.includes(offer.id) ? 'checked' : '';
    const eventInputName = `event-offer-${offer.title.toLowerCase().replaceAll(' ', '-')}`;
    return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="${eventInputName}" data-offer-id="${offer.id}" ${checked}>
          <label class="event__offer-label" for="event-offer-${i}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`;
  }).join('');

  return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersMarkup}
        </div>
      </section>
    `);
};

const createEventEditDestinationTemplate = (data, eventCommon) => {
  const destination = eventCommon.allDestinations.find((dest) => dest.id === data.destId);
  const photosTape = destination.pictures.length === 0 ? '' : `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`)}
      </div>
    </div>
  `;
  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${photosTape}
    </section>
  `);
};

const createEventEditOffersDestinationTemplate = (data, eventCommon) => (`
    <section class="event__details">
    ${(getOffersByType(data, eventCommon).length > 0) ? `${createEventEditOffersTemplate(data, eventCommon)}` : ''}
    ${(data.destId !== -1) ? `${createEventEditDestinationTemplate(data, eventCommon)}` : ''}
    </section>
`);

const createEventEditTemplate = (data, eventCommon) => {
  const isNewEvent = !('id' in data);
  const { basePrice, dateFrom, dateTo, type, isDisabled, isSaving, isDeleting } = data;
  const destinationDataList = eventCommon.allDestinations.map((dest) => `<option value="${dest.name}">`).join('');

  let destName = '';
  let isSubmitDisabled = true;
  if (data.destId !== -1) {
    destName = eventCommon.allDestinations.find((dest) => dest.id === data.destId).name;
    isSubmitDisabled = false;
  }

  const eventEditOffersDestinationTemplate =
    (getOffersByType(data, eventCommon).length === 0 && data.destId === -1) ? '' :
      createEventEditOffersDestinationTemplate(data, eventCommon);

  return (
    `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${data.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${data.id}"
              type="checkbox" ${isDisabled ? 'disabled' : ''}>
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventEditEventTypeItemsTemplate(data)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${data.id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${data.id}"
              type="text" name="event-destination" value="${destName}" list="destination-list-${data.id}"
              ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-${data.id}">
              ${destinationDataList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time">From</label>
            <input class="event__input  event__input--time" id="event-start-time" type="text"
              name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}"
              ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time">To</label>
            <input class="event__input  event__input--time" id="event-end-time" type="text"
              name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}"
              ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${data.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${data.id}"
              type="text" name="event-price" value="${basePrice !== null ? basePrice : ''}"
              ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit"
            ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          ${isNewEvent ? `
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>
          ` : `
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Open event</span>
          </button>
          `}
        </header>
        ${eventEditOffersDestinationTemplate}
      </form>
    </li>
    `
  );
};

export default class EventFormView  extends AbstractStatefulView {
  #eventCommon = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;
  #datepicker = { from: null, to: null };

  constructor(
    { event = {
      ...BLANK_POINT,
      dateFrom: new Date(),
      dateTo: new Date(),
    }, eventCommon, onFormSubmit, onDeleteClick, onCloseClick }) {
    super();
    this._setState(EventEditView.parseEventToState(event));
    this.#eventCommon = eventCommon;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#eventCommon);
  }

  removeElement() {
    super.removeElement();

    for (const key in this.#datepicker) {
      if (this.#datepicker[key]) {
        this.#datepicker[key].destroy();
        this.#datepicker[key] = null;
      }
    }
  }

  reset(event) {
    this.updateElement(
      EventEditView.parseEventToState(event),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    const rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    if (rollupButtonElement) {
      rollupButtonElement.addEventListener('click', this.#closeClickHandler);
    }
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    if (getOffersByType(this._state, this.#eventCommon).length > 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.#setDatepicker();
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedOffers = this._state.type === evt.target.value ? this._state.selectedOffers : [];
    this.updateElement({
      type: evt.target.value,
      selectedOffers,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value === '') { evt.target.value = '1'; }
    const parsedPrice = parseInt(evt.target.value, 10);
    if (isNaN(parsedPrice) || parsedPrice < 1) {
      evt.target.value = this._state.basePrice;
    } else {
      this._state.basePrice = parsedPrice;
    }
  };

  #offerChangeHandler = (evt) => {
    let selectedOffers = this._state.selectedOffers;
    const offerId = parseInt(evt.target.dataset.offerId, 10);
    if (evt.target.checked) {
      selectedOffers.push(offerId);
      selectedOffers.sort();
    } else {
      selectedOffers = this._state.selectedOffers.filter((e) => e !== offerId);
    }
    this.updateElement({ selectedOffers });
  };

  #destinationChangeHandler = (evt) => {
    const destination = this.#eventCommon.allDestinations.find((dest) => dest.name === evt.target.value);
    const destId = destination === undefined ? -1 : destination.id;
    this.updateElement({ destId });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    this.#datepicker.from = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepicker.to = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditView.parseStateToPoint(this._state));
  };

  #closeClickHandler = () => {
    this.#handleCloseClick();
  };

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const event = { ...state };

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
