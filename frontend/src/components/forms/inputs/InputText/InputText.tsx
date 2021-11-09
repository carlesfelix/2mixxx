import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes } from 'react';
import ControlledInputProps from '../../../../types/ControlledInputProps';

type InputTextProps = ControlledInputProps<string, InputHTMLAttributes<HTMLInputElement> | undefined>;

export default function InputText(props: InputTextProps) {
  const {
    name, onBlur, onChange, value = '', extraProps,
    className = ''
  } = props;
  const rootClassName = classNames('input', { [className]: !!className });
  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.value);
  }
  return (
    <input
      {...extraProps} type="text"
      name={name} onBlur={onBlur} onChange={changeHandler}
      value={value} autoComplete="off"
      className={rootClassName}
    />
  );
}
