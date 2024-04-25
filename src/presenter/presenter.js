import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { render } from '../framework/render.js';

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
    render(new EventFormView({
      event: this.#boardEvents[0],
      destinations: this.destinations,
      offersByType: this.#eventsModel.getOffersByType(this.#boardEvents[0].type)
    }),
    this.#eventListComponent.element);


    this.#renderEvent();
  }

  #renderEvent() {
    for (let i = 0; i < this.#boardEvents.length; i++) {
      const eventComponent = new EventView({
        event: this.#boardEvents[i],
        destination: this.#eventsModel.getDestinationById(this.#boardEvents[i].destination),
        offersByType: this.#eventsModel.getOffersByType(this.#boardEvents[i].type)
      });

      render(eventComponent, this.#eventListComponent.element);
    }
  }
}
