import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { render, replace } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();

  #boardEvents = [];

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }

  init() {

    this.#boardEvents = [...this.#eventsModel.events];
    this.destinations = [...this.#eventsModel.destinations];
    this.offers = [...this.#eventsModel.offers];

    this.#renderSort();
    this.#renderBoard();
    this.#renderNoEventComponent();
  }

  #renderEvent(event) {

    const escKeyDownHandler = (evt) => {

      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      allDestinations: this.destinations,
      offersByType: this.#eventsModel.getOffersByType(event.type),

      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventFormView({
      event,
      allDestinations: this.destinations,
      offersByType: this.#eventsModel.getOffersByType(event.type),

      onEditClick: () => {
        replaceFormToCard();
        document.addEventListener('keydown', escKeyDownHandler);
      },

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

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoEventComponent() {
    render(this.#noEventComponent, this.#eventListComponent.element);
  }

  #renderBoard() {
    render(this.#eventListComponent, this.#boardContainer);

    if (this.#boardEvents.length === 0) {
      this.#renderNoEventComponent();
      return;
    }

    this.#boardEvents.forEach((item) => {
      this.#renderEvent(item);
    });
  }

}

