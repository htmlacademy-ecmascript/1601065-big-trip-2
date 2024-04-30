import AbstractView from '../framework/view/abstract-view.js';

function createNoEventTemplate() {
  return (
    `<p class="board__no-event">
        Click New Event to create your first point
    </p>`
  );
}

export default class NoEventView extends AbstractView {
  get template() {
    return createNoEventTemplate();
  }
}
