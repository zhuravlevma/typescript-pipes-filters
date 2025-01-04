export abstract class Filter<T> {
  abstract process(input: T): T;
}
