import {getRandomEvent} from '../mock/events.js';
import { getRandomEventOffers } from '../mock/offers.js';

const EVENT_COUNT = 4;

export default class EventsModel {
  event = Array.from({length: EVENT_COUNT}, getRandomEvent, getRandomEventOffers);

  getTasks() {
    return this.event;
  }
}
