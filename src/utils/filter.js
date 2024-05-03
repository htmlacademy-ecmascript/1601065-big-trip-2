import {FILTER_TYPES} from '../const.js';
import {isEventPast, isEventToday, isEventFuture} from './events.js';

const filters = {

  [FILTER_TYPES.Everything]: (events) => events.filter((event) => event),
  [FILTER_TYPES.Past]: (events) => events.filter((event) => isEventPast(event.dateFrom, event.dateTo)),
  [FILTER_TYPES.Present]: (events) => events.filter((event) => isEventToday(event.dateFrom , event.dateTo)),
  [FILTER_TYPES.Future]: (events) => events.filter((event) => isEventFuture(event.dateFrom , event.dateTo)),
};

export {filters};
