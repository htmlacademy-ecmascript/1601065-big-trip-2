import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { replace, render, remove } from '../framework/render.js';

export default class EventPresenter {
  #eventsModel = null;
  #destinations = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #eventContainer = null;


  constructor({eventsModel, destinations, eventContainer}) {
    this.#eventsModel = eventsModel;
    this.#destinations = destinations;
    this.#eventContainer = eventContainer;
  }


  init(event) {
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event,
      allDestinations: this.#destinations,
      offersByType: this.#eventsModel.getOffersByType(event.type),

      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#eventEditComponent = new EventFormView({
      event,
      allDestinations: this.#destinations,
      offersByType: this.#eventsModel.getOffersByType(event.type),

      onEditClick: () => {
        this.#replaceFormToCard();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },

      onFormSubmit: () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }

    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventContainer);
      return;
    }

    if (this.#eventContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventContainer.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
  }
}
