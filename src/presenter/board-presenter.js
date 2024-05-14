import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
import EventsModel from '../model/events-model.js';

export default class BoardPresenter {
  eventComponent = null;
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
  }

  #renderEvent(event) {
    const boardElement = document.querySelector('.trip-events');
    const eventsModel = new EventsModel();
    const eventPresenter = new EventPresenter({
      eventComponent: this.#eventListComponent.element,
      boardContainer: boardElement,
      eventsModel
    });

    eventPresenter.init(event);
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

