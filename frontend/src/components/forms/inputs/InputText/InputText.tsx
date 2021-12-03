import classNames from 'classnames';
import { ChangeEvent } from 'react';
import ControlledInputProps from '../../../../types/ControlledInputProps';

export type InputTextExtraProps = {
  autoComplete?: 'on' | 'off';
  disabled?: boolean;
  password?: boolean;
  placeholder?: string;
}
export type InputTextProps = ControlledInputProps<string, InputTextExtraProps | undefined>;

export default function InputText(props: InputTextProps) {
  const {
    name, onBlur, onChange, value = '', extraProps = {},
    className = ''
  } = props;
  const {
    autoComplete = 'off', disabled,
    password, placeholder
  } = extraProps;
  const rootClassName = classNames('input', { [className]: !!className });
  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.value);
  }
  return (
    <input
      type={password ? 'password': 'text'}
      name={name} onBlur={onBlur} onChange={changeHandler}
      value={value} autoComplete={autoComplete}
      className={rootClassName} placeholder={placeholder}
      disabled={disabled}
    />
  );
}
