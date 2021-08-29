type AsyncState<T> = {
  inProgress: boolean;
  error: Error | null | boolean;
  data: T;
};

export default AsyncState;
