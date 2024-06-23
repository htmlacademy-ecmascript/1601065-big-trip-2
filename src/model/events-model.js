import { mockEvents } from '../mock/events.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import Observable from '../framework/observable.js';

export default class EventsModel extends Observable {
  #events = mockEvents;
  #destinations = mockDestinations;
  #offers = mockOffers;

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}

