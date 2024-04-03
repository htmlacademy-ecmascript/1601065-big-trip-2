import {createElement} from '../render.js';

function createTripEventsMsgTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class TripEventsMsgView {
  getTemplate() {
    return createTripEventsMsgTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
