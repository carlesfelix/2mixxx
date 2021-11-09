type ControlledInputProps<Value, ExtraProps = any> = {
  onChange: (value: Value) => void;
  onBlur?: () => void;
  value: Value;
  name?: string;
  extraProps: ExtraProps;
  className?: string;
};

export default ControlledInputProps;
