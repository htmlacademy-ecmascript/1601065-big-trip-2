import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import TripEventsMsgView from '../view/trip-events-msg-view.js';
import ErrorLoadingView from '../view/error-loading-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { sortDate, sortPrice } from '../utils/events.js';
import { SORT_TYPES, UpdateType, UserAction, FILTER_TYPES } from '../const.js';
import { filters } from '../utils/filter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { calculateTotalPrice } from '../utils/events.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #eventCommonModel = null;
  #filterModel = null;

  #eventListComponent = new TripEventsListView();
  #loadingComponent = new TripEventsMsgView();
  #errorLoadingView = new ErrorLoadingView();
  #sortComponent = null;
  #noEventComponent = null;

  #eventCommon = null;
  #eventPresenter = new Map();
  #newEventPresenter = null;
  #currentSortType = SORT_TYPES.Day;
  #filterType = FILTER_TYPES.Everything;
  #isEventLoading = true;
  #isEventCommonLoading = true;
  #isErrorLoading = false;
  #onNewEventDestroy = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ boardContainer, eventsModel, eventCommonModel, filterModel, onNewEventDestroy }) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#eventCommonModel = eventCommonModel;
    this.#eventCommon = this.#eventCommonModel.eventCommon;
    this.#filterModel = filterModel;
    this.#onNewEventDestroy = onNewEventDestroy;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#eventCommonModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filters[this.#filterType](events);

    switch (this.#currentSortType) {
      case SORT_TYPES.Day:
        filteredEvents.sort(sortDate);
        break;
      case SORT_TYPES.Price:
        filteredEvents.forEach((event) => {
          event.totalPrice = calculateTotalPrice(event, this.#eventCommon);
        });
        filteredEvents.sort(sortPrice);
        filteredEvents.forEach((event) => delete event.totalPrice);
        break;
    }

    return filteredEvents;
  }

  init() {
    this.#renderBoard();
  }

  createEvent() {
    this.#currentSortType = SORT_TYPES.Day;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPES.Everything);
    this.#newEventPresenter.init();
  }

  #createNewEventPresenter() {
    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventListComponent.element,
      eventCommon: this.#eventCommon,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewEventDestroy,
    });
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenter.get(update.id).setSaving();
        try {
          this.#eventsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          this.#eventsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenter.get(update.id).setDeleting();
        try {
          this.#eventsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT_POINT:
        this.#isEventLoading = false;
        break;
      case UpdateType.INIT_POINT_COMMON:
        this.#eventCommon = this.#eventCommonModel.eventCommon;
        this.#isEventCommonLoading = false;
        break;
      case UpdateType.ERROR_LOADING:
        this.#isErrorLoading = true;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
    if ((updateType === UpdateType.INIT_POINT ||
      updateType === UpdateType.INIT_POINT_COMMON) &&
      (!this.#isEventLoading && !this.#isEventCommonLoading)) {
      this.#createNewEventPresenter();
      remove(this.#loadingComponent);
      this.#renderBoard();
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
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvents(events) {
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #renderErrorLoading() {
    render(this.#errorLoadingView, this.#boardContainer);
  }

  #renderNoEvents() {
    this.#noEventComponent = new NoEventView({
      filterType: this.#filterType
    });

    render(this.#noEventComponent, this.#boardContainer);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      eventCommon: this.#eventCommon,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.Day;
    }
  }

  #renderBoard() {
    if (this.#isErrorLoading) {
      this.#renderErrorLoading();
      return;
    }

    if (this.#isEventLoading || this.#isEventCommonLoading) {
      this.#renderLoading();
      return;
    }

    const events = this.events;
    if (events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#boardContainer);
    this.#renderEvents(events);
  }
}

