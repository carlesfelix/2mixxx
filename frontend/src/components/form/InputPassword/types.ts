import ControlledFieldProps from "../../../types/ControlledFieldProps";

export type BaseInputPasswordProps = {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export type InputPasswordProps = ControlledFieldProps<BaseInputPasswordProps>;
