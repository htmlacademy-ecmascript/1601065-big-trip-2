import AbstractView from '../framework/view/abstract-view.js';

function createNoEventTemplate() {
  return (
    `<p class="board__no-event trip-events__msg">
        Click New Event to create your first point
    </p>`

  );
}

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    // return createNoEventTemplate();
    return createNoEventTemplate(this.#filterType);
  }
}
