import {FILTER_TYPE} from '../const.js';
import {isEventExpired, isEventExpiringToday, isEventBefore} from './events.js';

const filter = {
  [FILTER_TYPE.Everything]: (events) => events.filter((event) => event),
  [FILTER_TYPE.Past]: (events) => events.filter((event) => isEventExpired(event.dueDate)),
  [FILTER_TYPE.Present]: (events) => events.filter((event) => isEventExpiringToday(event.dueDate)),
  [FILTER_TYPE.Future]: (events) => events.filter((event) => isEventBefore(event.dueDate)),
};

export {filter};
