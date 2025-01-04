export interface Filter<T> {
  process(input: T): T;
}
