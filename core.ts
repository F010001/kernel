interface Repository<T> {
  create: (entity: T) => T;
  get: () => T;
  delete: (id: number) => void;
}
