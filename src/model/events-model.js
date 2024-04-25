import { mockEvents } from '../mock/events.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

export default class EventsModel {
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

