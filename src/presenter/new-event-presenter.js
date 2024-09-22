import { remove, render, RenderPosition } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #eventEditComponent = null;

  #eventCommon = null;

  constructor({ eventListContainer, eventCommon, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#eventCommon = eventCommon;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventFormView({
      eventCommon: this.#eventCommon,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
