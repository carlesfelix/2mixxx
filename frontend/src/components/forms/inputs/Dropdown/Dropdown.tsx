import classNames from 'classnames';
import { ChangeEventHandler } from 'react';
import ControlledInputProps from '../../../../types/ControlledInputProps';
import DropdownOptions from '../../../../types/DropdownOptions';

type DropdownValue = string | number;
export type DropdownExtraProps<DropdownValues = any> = {
  options: DropdownOptions<DropdownValues>;
};
type DropdownProps = ControlledInputProps<DropdownValue, DropdownExtraProps>;

export default function Dropdown(props: DropdownProps) {
  const {
    name, onBlur, onChange, value, extraProps,
    className = ''
  } = props;
  const { options } = extraProps;
  const rootClassName = classNames('input', { [className]: !!className });
  function selectedHandler(): ChangeEventHandler<HTMLSelectElement> {
    return event => {
      const { currentTarget } = event;
      const { selectedIndex } = currentTarget;
      onChange(options[selectedIndex].value);
    };
  }
  return (
    <select
      required={false}
      className={rootClassName} name={name} onBlur={onBlur}
      value={value} onChange={selectedHandler()}
    >
      {
        options.map(({ label, value: optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))
      }
    </select>
  );
}