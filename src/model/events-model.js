import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #events = [];

  constructor({ eventsApiService }) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch (err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT_POINT);
  }

  async updatePoint(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updatePoint(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#eventsApiService.addPoint(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);

      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'], // На клиенте дата хранится как экземпляр Date
      destId: event['destination'],
      selectedOffers: event['offers'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['destination'];
    delete adaptedEvent['offers'];

    return adaptedEvent;
  }
}
