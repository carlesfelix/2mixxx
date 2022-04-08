import { Control, ControllerProps } from "react-hook-form";

type BaseFieldProps = {
  control: Control<any>;
  defaultValue?: any;
  rules?: ControllerProps['rules'];
  label?: string;
  name: string;
  fieldClassName?: string;
};

export default BaseFieldProps;
