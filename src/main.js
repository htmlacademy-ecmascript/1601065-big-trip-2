import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/presenter.js';
import { render } from './framework/render.js';
import {RenderPosition} from './render.js';
import EventsModel from './model/events-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const boardElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const boardPresenter = new BoardPresenter({boardContainer: boardElement,
  eventsModel,
});
debugger
render(new TripFiltersView(), siteFiltersElement);
render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
