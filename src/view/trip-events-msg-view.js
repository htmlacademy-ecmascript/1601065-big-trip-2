import AbstractView from '../framework/view/abstract-view';

function createTripEventsMsgTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class TripEventsMsgView extends AbstractView {
  get template() {
    return createTripEventsMsgTemplate();
  }
}
