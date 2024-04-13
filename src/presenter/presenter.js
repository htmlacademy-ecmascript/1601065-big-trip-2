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

    render(this.sortComponent,
      this.boardContainer);
    render(this.eventListComponent,
      this.boardContainer);
    render(new EventFormView({
      event: this.boardEvents[0],
      // destination: this.destinations[0],
      // offer: this.offers[0]
      destination: this.eventsModel.getDestinationById(this.boardEvents[0].destination),
      offer: this.eventsModel.getOffersByType(this.boardEvents[0].type)
    }),
    this.eventListComponent.getElement());

    for (let i = 0; i < this.boardEvents.length; i++) {
      render(new EventView({
        event: this.boardEvents[i],
        destination: this.eventsModel.getDestinationById(this.boardEvents[i].destination),
        offersByType: this.eventsModel.getOffersByType(this.boardEvents[i].type)
      }),
      this.eventListComponent.getElement());
    }
  }
}
