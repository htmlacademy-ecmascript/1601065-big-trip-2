import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortByPrice, sortByTime } from '../utils/events.js';
import { SORT_TYPES } from '../const.js';
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = null;
  #eventListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();

  #boardEvents = [];
  #eventPresenters = new Map();
  #currentSortType = SORT_TYPES.Day;
  #sourcedBoardEvents = [];

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }

  get events() {
    return this.#eventsModel.events;
  }

  init() {

    this.#boardEvents = [...this.#eventsModel.events];
    this.destinations = [...this.#eventsModel.destinations];
    this.offers = this.#eventsModel.offers;
    this.#sourcedBoardEvents = [...this.#eventsModel.events];

    this.#renderSort();
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventContainer: this.#eventListComponent.element,
      eventsModel: this.#eventsModel,
      destinations: this.destinations,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updatedEvent);
    this.#sourcedBoardEvents = updateItem(this.#sourcedBoardEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SORT_TYPES.Day:
        this.#boardEvents = [...this.#sourcedBoardEvents];
        break;
      case SORT_TYPES.Time:
        this.#boardEvents.sort(sortByTime);
        break;
      case SORT_TYPES.Price:
        this.#boardEvents.sort(sortByPrice);
        break;
      default:
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
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

