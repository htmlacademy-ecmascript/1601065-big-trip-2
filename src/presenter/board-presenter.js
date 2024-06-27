import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
import { sortByPrice, sortByTime } from '../utils/events.js';
import { SORT_TYPES, UpdateType, UserAction } from '../const.js';
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = null;
  #eventListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();
  #boardComponent = new BoardView();
  #renderedEventCount = null;
  #eventPresenters = new Map();
  #currentSortType = SORT_TYPES;

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (this.#currentSortType) {
      case SORT_TYPES.Day:
        [...this.#eventsModel.events]
      break;
      case SORT_TYPES.Time:
        [...this.#eventsModel.events].sort(sortByTime);
      break;
      case SORT_TYPES.Price:
        [...this.#eventsModel.events].sort(sortByPrice);
    }

    return this.#eventsModel.events;
  }

  init() {

    this.destinations = [...this.#eventsModel.destinations];
    this.offers = this.#eventsModel.offers;

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedEventCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventContainer: this.#eventListComponent.element,
      eventsModel: this.#eventsModel,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents(events) {
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderNoEventComponent() {
    render(this.#noEventComponent, this.#eventListComponent.element);
  }

  #clearBoard({resetRenderedEventCount = false, resetSortType = false} = {}) {
    const eventCount = this.events.length;

    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if (resetRenderedEventCount) {
      this.#renderedEventCount;
    } else {
      this.#renderedEventCount = Math.min(eventCount, this.#renderedEventCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
    render(this.#eventListComponent, this.#boardContainer);
    const events = this.events;
    const eventCount = events.length;

    if (eventCount === 0) {
      this.#renderNoEventComponent();
      return;
    }
    this.#renderSort();
    render(this.#eventListComponent, this.#boardComponent.element);
    this.#renderEvents(events.slice(0, Math.min(eventCount, this.#renderedEventCount)));
  }

}

