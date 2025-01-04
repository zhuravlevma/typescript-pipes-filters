import { Filter } from './filter';

export class Pipeline<T> {
  filters: Filter<T>[] = [];

  addFilter(filter: Filter<T>) {
    this.filters.push(filter);
  }

  process(data: T): T {
    let currentData = data;
    for (const filter of this.filters) {
      currentData = filter.process(currentData);
    }
    return currentData;
  }
}
