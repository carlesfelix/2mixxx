type OptionItem<Data = any> = {
  label: string;
  onSelected?: (data?: Data) => void;
};

export default OptionItem;
