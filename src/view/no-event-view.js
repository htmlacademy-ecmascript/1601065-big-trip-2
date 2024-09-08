import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../const.js';

const NoEventsTextType = {
  [FILTER_TYPES.Everything]: 'Click New Event to create your first point',
  [FILTER_TYPES.Future]: 'There are no future events now',
};

const createNoEventMessageTemplate = (filterType) => {
  const noEventTextValue = NoEventsTextType[filterType];
  return (
    `<p class="trip-events__msg">
      ${noEventTextValue}
    </p>`
  );
};

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventMessageTemplate(this.#filterType);
  }
}
