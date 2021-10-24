import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ChangeEvent, ReactNode } from 'react';
import ControlledInputProps from '../../../../types/ControlledInputProps';
import './Checkbox.scss';

export type CheckboxExtraProps = {
  label?: ReactNode;
  labelPosition?: 'left' | 'right';
};
type CheckboxProps = ControlledInputProps<boolean, CheckboxExtraProps>;

export default function Checkbox(props: CheckboxProps) {
  const {
    className = '', extraProps, name,
    onBlur, onChange, value
  } = props;
  const { label, labelPosition = 'left' } = extraProps;
  const checkboxClassName = classNames('Checkbox', {
    'Checkbox--reverse': labelPosition === 'right',
    [className]: !!className
  });
  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.checked);
  }
  function blurHandler(): void {
    onBlur && onBlur();
  }
  return (
    <label className={checkboxClassName} onBlur={blurHandler}>
      {
        !!label && (
          <span className="checkbox-label checkbox-element">
            {label}
          </span>
        )
      }
      <input
        type="checkbox"
        className="checkbox-input-native checkbox-element"
        name={name}
        checked={value}
        onChange={changeHandler}
      />
      <span className="checkbox-input checkbox-element">
        <FontAwesomeIcon icon={faCheck} className="checkbox-input__checked" />
      </span>
    </label>
  );
}
