import ControlledFieldProps from "../../../types/ControlledFieldProps";

export type BaseInputTextProps = {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};
export type InputTextProps = ControlledFieldProps<BaseInputTextProps>;
