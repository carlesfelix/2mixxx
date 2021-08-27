type DialogState<T = any> = {
  data?: T;
  inProgress: boolean;
  isOpen: boolean;
}

export default DialogState;
