import { EVENT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createEventTypeTemplate(eventType) {
  return(
    `${EVENT_TYPES.map((type) => {
      const formattedType = type.toLocaleLowerCase();

      return (
        `<div class="event__type-item">
            <input
            id="event-type-${formattedType}-1"
            class="event__type-input  visually-hidden"
            type="radio"
            name="event-type"
            value="${formattedType}"
            ${eventType === formattedType ? 'checked' : '' }
          >
          <label class="event__type-label event__type-label--${formattedType}" for="event-type-${formattedType}-1">${type}</label>
        </div>`
      );
    }).join('')}
    `
  );
}

function createOffersTemplate(offersByType, eventOffers) {
  if (offersByType.length === 0) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersByType.map((offerItem) => (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"
          id="${offerItem.id}"
          type="checkbox"
          ${eventOffers.includes(offerItem.id) ? 'checked' : '' }
          >
          <label class="event__offer-label" for="${offerItem.id}">
            <span class="event__offer-title">${offerItem.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${offerItem.price}</span>
          </label>
        </div>`
    )).join('')}
      </div>
    </section>`
  );
}

function createDestinationTemplate(pointDestination) {

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>
      <div class="event__photos-container">
      ${pointDestination.pictures.map((picture) => (
      `<div class="event__photos-tape">
          <img class="event__photo" src="${picture.src}" alt="${pointDestination.name}">
       </div>`

    )).join('')}
      </div>
    </section>`
  );
}

function createOptionTemplate(allDestinations) {

  return (
    `<datalist id="destination-list-1">
    ${allDestinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
    </datalist>`
  );
}

function createEventEditTemplate(event, allDestinations, offersByType) {

  const {basePrice, destination, type, offers} = event;
  const pointDestination = allDestinations.find((item) => destination === item.id);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeTemplate(type)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${event.type}
            </label>
            <input class="event__input  event__input--destination"
            id="event-destination-1" type="text"
            name="${pointDestination.name}"
            value="${pointDestination.name}"
            list="destination-list-1">
            ${createOptionTemplate(allDestinations)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${createOffersTemplate(offersByType, offers)}

          ${createDestinationTemplate(pointDestination)}
        </section>
    </form>
  </li>`
  );
}

export default class EventFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #event = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({event, offersByType, allDestinations, onFormSubmit, onEditClick}) {
    super();
    this.#event = event;
    this.#offers = offersByType;
    this.#destinations = allDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;


    this._setState(EventFormView.parsePointToState(event));
    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#destinations, this.#offers);
  }

  reset(event) {
    this.updateElement(
      EventFormView.parseEventToState(event),
    );
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  _restoreHandlers = () => {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#handleEditClick);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventFormView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({type: evt.target.value, offers: []});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);

    if (selectedDestination?.id) {
      this.updateElement({ destination: selectedDestination.id});
    }
  };

  #offersChangeHandler = (evt) => {
    const newOffers = evt.target.checked
      ? this._state.offers.concat(evt.target.id)
      : this._state.offers.filter((item) => item !== evt.target.id);
    this._setState({ offers: newOffers});
  };

  #priceChangeHandler = (evt) => {
    this._setState({basePrice: Number(evt.target.value)});
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({...this._state, dateFrom: userDate});
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({...this._state, dateTo: userDate});
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek:1},
      'time_24hr': true

    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo,
      });

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom,
      });
  };

  static parsePointToState = (event) => ({...event});

  static parseStateToPoint = (state) => ({...state});
}
