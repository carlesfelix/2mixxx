type Async<Data = any> = {
  error?: any;
  inProgress: boolean;
  data: Data;
};

export default Async;