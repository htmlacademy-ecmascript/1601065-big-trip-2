import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventsListView();

  #boardEvents = [];

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }

  init() {

    this.#boardEvents = [...this.#eventsModel.events];
    this.destinations = [...this.#eventsModel.destinations];
    this.offers = [...this.#eventsModel.offers];

    render(this.#sortComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);
    // render(new EventFormView({
    //   event: this.#boardEvents[0],
    //   allDestinations: this.destinations,
    //   offersByType: this.#eventsModel.getOffersByType(this.#boardEvents[0].type)
    // }),
    // this.#eventListComponent.element);

    for (let i = 0; i < this.#boardEvents.length; i++) {
      this.#renderEvent(this.#boardEvents[i]);
    }
  }

  #renderEvent(event, allDestinations, offersByType) {
    allDestinations = this.destinations;
    offersByType = this.#eventsModel.getOffersByType(this.#boardEvents[0].type);
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new EventView({
      event, allDestinations, offersByType,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditComponent = new EventFormView({
      event, allDestinations, offersByType,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, eventEditComponent);
    }
    render(eventComponent, this.#eventListComponent.element);
  }
}

