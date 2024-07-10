import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { sortByPrice, sortByTime } from '../utils/events.js';
import { SORT_TYPES, UpdateType, UserAction, FILTER_TYPES } from '../const.js';
import { filters } from '../utils/filter.js';
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = null;
  #eventListComponent = new TripEventsListView();
  #noEventComponent = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SORT_TYPES;
  #filterModel = null;
  #filterType = FILTER_TYPES.Everything;

  constructor({boardContainer, eventsModel, filterModel, onNewEventDestroy }) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
      eventsModel: eventsModel,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filters[this.#filterType](events);
    switch (this.#currentSortType) {
      case SORT_TYPES.Day:
      return [...this.#eventsModel.events];
      case SORT_TYPES.Time:
        return filteredEvents.sort(sortByTime);
      case SORT_TYPES.Price:
        return filteredEvents.sort(sortByPrice);
    }
    return filteredEvents;
  }

  init() {
    this.#renderBoard();
  }

  createEvent() {
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPES.Everything);
    this.#newEventPresenter.init();
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
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
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    // render(this.#sortComponent, this.#eventListComponent.element);
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventContainer: this.#eventListComponent.element,
      eventsModel: this.#eventsModel,
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
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterType
    });

    render(this.#noEventComponent, this.#eventListComponent.element);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.Day;
    }
  }

  #renderBoard() {
    render(this.#eventListComponent, this.#boardContainer);
    const events = this.events;

    if (events.length === 0) {
      this.#renderNoEventComponent();
      return;
    }
    this.#renderSort();
    this.#renderEvents(events);
  }

}

