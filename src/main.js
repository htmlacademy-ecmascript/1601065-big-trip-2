import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';
import { RenderPosition } from './render.js';
import EventsModel from './model/events-model.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const boardElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: boardElement,
  eventsModel,
});

const filters = generateFilter(eventsModel.events);

render(new TripFiltersView({filters}), siteFiltersElement);
render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
