import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  sortComponent = new TripSortView();
  eventListComponent = new TripEventsListView();

  constructor({boardContainer, eventsModel}) {
    this.boardContainer = boardContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.boardEvents = [...this.eventsModel.getTasks()];
    this.destinations = this.eventsModel.getDestinations();
    this.offers = [...this.eventsModel.getOffers()];

    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new EventFormView({event: this.boardEvents[0]}), this.eventListComponent.getElement());

    for (let i = 1; i < this.boardEvents.length; i++) {
      render(new EventView({event: this.boardEvents[i], destinations: this.destinations, offers: this.offers}), this.eventListComponent.getElement());
    }
  }
}
