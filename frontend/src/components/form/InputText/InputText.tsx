import classNames from "classnames";
import { ChangeEvent, forwardRef } from "react";
import ControlledFieldProps from "../../../types/ControlledFieldProps";
import { InputTextProps } from "./types";

const InputText = forwardRef<
  HTMLInputElement,
  ControlledFieldProps<InputTextProps>>((props, ref) => {
  const {
    placeholder,
    value,
    disabled,
    onChange,
    className,
    ...extraProps
  } = props;
  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.value)
  }
  const rootClassName = classNames('InputText', 'input', className);
  return (
    <input
      ref={ref}
      className={rootClassName}
      type="text"
      placeholder={placeholder}
      value={value ?? ''}
      autoComplete="off"
      disabled={disabled}
      onChange={changeHandler}
      {...extraProps}
    />
  );
});

export default InputText;
