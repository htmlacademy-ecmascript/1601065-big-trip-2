import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();

  #boardEvents = [];
  #eventPresenters = new Map();

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }

  init() {

    this.#boardEvents = [...this.#eventsModel.events];
    this.destinations = [...this.#eventsModel.destinations];
    this.offers = this.#eventsModel.offers;

    this.#renderSort();
    this.#renderBoard();
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventContainer: this.#eventListComponent.element,
      eventsModel: this.#eventsModel,
      destinations: this.destinations
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    // remove(this.#sortComponent);
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
