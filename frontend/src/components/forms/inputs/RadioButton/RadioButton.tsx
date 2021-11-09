import classNames from 'classnames';
import { ChangeEvent, ReactNode } from 'react';
import ControlledInputProps from '../../../../types/ControlledInputProps';
import './RadioButton.scss';

export type RadioButtonExtraProps = {
  label?: ReactNode;
  labelPosition?: 'left' | 'right';
};
type RadioButtonProps = ControlledInputProps<boolean, RadioButtonExtraProps>;

export default function RadioButton(props: RadioButtonProps) {
  const {
    className = '', extraProps, name,
    onBlur, onChange, value
  } = props;
  const { label, labelPosition = 'left' } = extraProps;
  const radioButtonClassName = classNames('RadioButton', {
    'RadioButton--reverse': labelPosition === 'right',
    [className]: !!className
  });
  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.checked);
  }
  function blurHandler(): void {
    onBlur && onBlur();
  }
  return (
    <label className={radioButtonClassName} onBlur={blurHandler}>
      {
        !!label && (
          <span className="radio-button-label radio-button-element">
            {label}
          </span>
        )
      }
      <input
        type="radio"
        className="radio-button-input-native radio-button-element"
        name={name}
        checked={value}
        onChange={changeHandler}
      />
      <span className="radio-button-input radio-button-element">
        <span className="radio-button-input__checked" />
      </span>
    </label>
  );
}
