type BaseAsync = {
  inProgress: boolean;
  error: Error | null | boolean;
};

type AsyncWithData<T> = BaseAsync & { data: T };

type AsyncState<T = undefined> = T extends undefined ?
  BaseAsync : AsyncWithData<T>;

export default AsyncState;
