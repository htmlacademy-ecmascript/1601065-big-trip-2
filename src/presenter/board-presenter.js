import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
// import EventView from '../view/event-form-view.js';
import { sortByPrice, sortByTime } from '../utils/events.js';
import { SORT_TYPES, UpdateType, UserAction } from '../const.js';

const EVENT_COUNT_PER_STEP = 8;
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = null;
  // #boardComponent = new EventView();
  #eventListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();
  #renderedEventCount = EVENT_COUNT_PER_STEP;
  #eventPresenters = new Map();
  #currentSortType = SORT_TYPES.Day;

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (sortType) {
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
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#eventsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#eventsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
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

    render(this.#sortComponent, this.#boardContainer);
  }

  // #clearEventList() {
  //   this.#eventPresenters.forEach((presenter) => presenter.destroy());
  //   this.#eventPresenters.clear();
  // }

  #renderNoEventComponent() {
    render(this.#noEventComponent, this.#eventListComponent.element);
  }

  #clearBoard({resetRenderedEventCount = false, resetSortType = false} = {}) {
    const taskCount = this.tasks.length;

    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if (resetRenderedEventCount) {
      this.#renderedEventCount = EVENT_COUNT_PER_STEP;
    } else {
      this.#renderedEventCount = Math.min(eventCount, this.#renderedEventCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
debugger
    render(this.#eventListComponent, this.#boardContainer);
    const events = this.events;
    const eventCount = events.length;

    if (taskCount === 0) {
      this.#renderNoEventComponent();
      return;
    }

    this.#eventsModel.events.forEach((item) => {
      this.#renderEvent(item);
    });

    render(this.#eventListComponent, this.#boardContainer);

    this.#renderBoard(events.slice(0, Math.min(eventCount, this.#renderedEventCount)));
  }

}

