import { useReducer } from 'react';

type RequestFn<T, K extends any[]> = (...args: K) => Promise<T>;

type Props<T> = {
  initialInProgress?: boolean;
  initialData: T;
};

export type RequestState<T> = {
  inProgress: boolean;
  error: Error | null;
  data: T;
};

type Action<T> = { type: 'inProgress', payload?: T } |
  { type: 'success', payload: T } |
  { type: 'error', payload: { error: Error, data?: T } };

type RequestActionConfig<T, K extends any[]> = {
  requestFn: RequestFn<T, K>;
  requestArgs: K;
  defaultData?: T;
};

type Dispatch<T> = (action: Action<T>) => void;

type RequestReducer<T> = (state: RequestState<T>, action: Action<T>) => RequestState<T>;

function requestReducer<T>(state: RequestState<T>, action: Action<T>): RequestState<T> {
  switch(action.type) {
    case 'inProgress':
      return {
        inProgress: true,
        error: null,
        data: action.payload ? action.payload : state.data
      };
    case 'success':
      return {
        inProgress: false,
        error: null,
        data: action.payload
      };
    case 'error':
      return {
        ...state,
        inProgress: false,
        error: action.payload.error,
        data: action.payload.data ? action.payload.data : state.data
      }
    default:
      return state;
  }
}

export async function requestAction<T, K extends any[] = []>(dispatch: Dispatch<T>, config: RequestActionConfig<T, K>): Promise<void> {
  const { requestFn, requestArgs, defaultData } = config;
  dispatch({ type: 'inProgress', payload: defaultData });
  try {
    const payload = await requestFn(...requestArgs);
    dispatch({ type: 'success', payload });
  } catch(error) {
    dispatch({ type: 'error', payload: { error, data: defaultData } });
  }
}

export default function useRequest<T>(props: Props<T>): [RequestState<T>, Dispatch<T>] {
  const { initialInProgress = false, initialData } = props;
  const [ state, dispatch ] = useReducer<RequestReducer<T>>(requestReducer, {
    inProgress: initialInProgress,
    error: null,
    data: initialData
  });
  return [ state, dispatch ];
}
