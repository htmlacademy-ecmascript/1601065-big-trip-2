import {filters} from '../utils/filter.js';

function generateFilter(tasks) {
  return Object.entries(filters).map(
    ([filterType, filterTasks]) => ({
      type: filterType,
      count: filterTasks(tasks).length,
    }),
  );
}

export {generateFilter};
