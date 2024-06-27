import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';
import { RenderPosition } from './render.js';
import EventsModel from './model/events-model.js';
// import { generateFilter } from './mock/filter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

// const filters = [
//   {
//     type: 'all',
//     count: 0,
//   },
// ];

const siteHeaderElement = document.querySelector('.trip-main');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const boardElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: boardElement,
  eventsModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel,
  eventsModel
});

// const filters = generateFilter(eventsModel.events);

// render(new TripFiltersView({filters}), siteFiltersElement);
render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
// render(new TripFiltersView({
//   filters,
//   currentFilterType: 'all',
//   onFilterTypeChange: () => {}
// }), boardElement);
filterPresenter.init();
boardPresenter.init();
