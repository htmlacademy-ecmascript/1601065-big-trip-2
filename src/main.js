import { render } from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js'
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js'
import EventCommonModel from './model/event-common-model.js'
import FilterModel from './model/filter-model.js';
import EventsApiService from './events-api-service.js';
import EventsCommonApiService from './events-common-api-service.js'

const AUTHORIZATION = 'Basic er883jdzbdw-';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const mainContentElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const siteHeaderElement = document.querySelector('.trip-main');
const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const eventCommonModel = new EventCommonModel({
  eventCommonApiService: new EventsCommonApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: mainContentElement,
  eventsModel,
  eventCommonModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
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

filterPresenter.init();
boardPresenter.init();

Promise.all([
  eventsModel.init(),
  eventCommonModel.init()])
  .then(() => {
    render(newEventButtonComponent, siteHeaderElement);
  });
