import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';
import { RenderPosition } from './render.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const boardElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: boardElement,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel,
  eventsModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(newEventButtonComponent, siteHeaderElement);

filterPresenter.init();
boardPresenter.init();
