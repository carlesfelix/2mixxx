type AsyncState<T> = {
  inProgress: boolean;
  error: Error | null;
  data: T;
};

export default AsyncState;
