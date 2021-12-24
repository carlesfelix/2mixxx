import classNames from 'classnames';
import { ReactNode } from 'react';
import ControlledInputProps from '../../../../types/ControlledInputProps';
import RadioButton from '../RadioButton/RadioButton';
import './RadioButtonCards.scss';

export type RadioButtonItem = {
  label: ReactNode;
  value: any;
};
export type RadioButtonCardsExtraProps = {
  items: RadioButtonItem[];
  radioButtonPosition?: 'left' | 'right';
};
type RadioButtonCardsProps = ControlledInputProps<any, RadioButtonCardsExtraProps>;

export default function RadioButtonCards(props: RadioButtonCardsProps) {
  const {
    extraProps, onChange, value,
    className = '', onBlur
  } = props;
  const { items, radioButtonPosition } = extraProps;
  const radioButtonCardsClassName = classNames('RadioButtonCards', {
    [className]: !!className
  });
  function changeHandler(item: RadioButtonItem): () => void {
    return () => {
      onChange(item.value);
    };
  }
  function blurHandler(): void {
    onBlur && onBlur();
  }
  return (
    <div className={radioButtonCardsClassName} onBlur={blurHandler}>
      {
        items.map((eachItem, iEachItem) => (
          <div className="radio-button-item" key={iEachItem}>
            <RadioButton
              className="radio-button-item__input card card-primary"
              onChange={changeHandler(eachItem)}
              value={eachItem.value === value}
              extraProps={{
                label: eachItem.label,
                labelPosition: radioButtonPosition
              }}
            />
          </div>
        ))
      }
    </div>
  );
}
