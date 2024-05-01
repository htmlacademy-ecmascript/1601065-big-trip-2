import {FILTER_TYPES} from '../const.js';
import {isEventExpired, isEventToday, isEventBefore} from './events.js';

const filters = {

  [FILTER_TYPES.Everything]: (events) => events.filter((event) => event),
  [FILTER_TYPES.Past]: (events) => events.filter((event) => isEventExpired(event.dateFrom, event.dateTo)),
  [FILTER_TYPES.Present]: (events) => events.filter((event) => isEventToday(event.dateFrom , event.dateTo)),
  [FILTER_TYPES.Future]: (events) => events.filter((event) => isEventBefore(event.dateTo , event.dateTo)),
};

export {filters};
