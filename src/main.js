import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/presenter.js';
import {render, RenderPosition} from './render.js';
import EventModel from './model/events-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const boardElement = document.querySelector('.trip-events');
const eventModel = new EventModel();
const boardPresenter = new BoardPresenter({boardContainer: boardElement,
  eventModel,
});

render(new TripFiltersView(), siteFiltersElement);
render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
