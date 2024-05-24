import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import { render } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from '../presenter/event-presenter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #sortComponent = null;
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
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
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

