import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
// import { updateItem } from '../utils/common.js';
import { sortByPrice, sortByTime } from '../utils/events.js';
import { SORT_TYPES, UpdateType, UserAction } from '../const.js';
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = null;
  #eventListComponent = new TripEventsListView();
  #noEventComponent = new NoEventView();

  #eventPresenters = new Map();
  #currentSortType = SORT_TYPES.Day;

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    debugger
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

  // #handleEventChange = (updatedEvent) => {
  //   this.#eventsModel.events = updateItem(this.#eventsModel.events, updatedEvent);
  //   this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  // };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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

    if (this.#eventsModel.events.length === 0) {
      this.#renderNoEventComponent();
      return;
    }

    this.#eventsModel.events.forEach((item) => {
      this.#renderEvent(item);
    });
  }

}

