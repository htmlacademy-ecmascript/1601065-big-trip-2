import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { replace, render } from '../framework/render.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventsModel = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #eventListComponent = new TripEventsListView();

  #events = [];

  constructor({boardContainer, eventsModel}) {
    this.#eventContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }


  init(event) {
    this.#events = [...this.#eventsModel.events];
    this.destinations = [...this.#eventsModel.destinations];
    this.offers = [...this.#eventsModel.offers];

    this.#eventComponent = new EventView({
      event,
      allDestinations: this.destinations,
      offersByType: this.#eventsModel.getOffersByType(event.type),

      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#eventEditComponent = new EventFormView({
      event,
      allDestinations: this.destinations,
      offersByType: this.#eventsModel.getOffersByType(event.type),

      onEditClick: () => {
        this.#replaceFormToCard();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },

      onFormSubmit: () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }

    });

    render(this.#eventComponent, this.#eventListComponent.element);
  }


  #escKeyDownHandler = (evt) => {

    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
  }

}
