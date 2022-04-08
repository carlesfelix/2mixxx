import classNames from "classnames";
import { ChangeEvent, forwardRef } from "react";
import { InputPasswordProps } from "./types";

const InputPassword = forwardRef<
  HTMLInputElement,
  InputPasswordProps
>((props, ref) => {
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
  const rootClassName = classNames('InputPassword', 'input', className);
  return (
    <input
      ref={ref}
      className={rootClassName}
      type="password"
      placeholder={placeholder}
      value={value}
      autoComplete="off"
      disabled={disabled}
      onChange={changeHandler}
      {...extraProps}
    />
  );
});

export default InputPassword;